const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

// --- 引数パース ---
const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
const genre  = get('--genre');
const limit  = parseInt(get('--limit') || '20', 10);
const isSend = args.includes('--send');

if (!genre) { console.error('使い方: node scripts/batch-send.js --genre <genre> --limit <n> [--send]'); process.exit(1); }

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function sbFetch(path, opts = {}) {
  const res = await fetch(SUPABASE_URL + path, {
    ...opts,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(opts.headers || {}),
    },
  });
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function replaceVars(str, p) {
  return str
    .replace(/\{\{shop_name\}\}/g, p.name        ?? '')
    .replace(/\{\{area\}\}/g,      p.area         ?? '')
    .replace(/\{\{genre\}\}/g,     p.genre        ?? '')
    .replace(/\{\{review_count\}\}/g, String(p.review_count ?? ''));
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log(`\n▶ genre=${genre}  limit=${limit}  mode=${isSend ? '本番送信' : 'dryRun'}\n`);

  // 1. テンプレート取得
  const templates = await sbFetch(
    `/rest/v1/salesbot_templates?genre=eq.${encodeURIComponent(genre)}&is_followup=eq.false&select=id,name,subject,body_html`
  );
  if (!templates || templates.length === 0) {
    console.error(`テンプレートが見つかりません (genre=${genre})`);
    process.exit(1);
  }
  const tmpl = templates[0];
  console.log(`テンプレート: ${tmpl.name} (${tmpl.id})\n`);

  // 2. 既送信 prospect_id 一覧
  const outreach = await sbFetch(
    `/rest/v1/salesbot_outreach?template_id=eq.${tmpl.id}&select=prospect_id`
  );
  const sentIds = new Set((outreach || []).map(r => r.prospect_id));

  // 3. prospect 取得（email あり・genre 一致）
  const prospects = await sbFetch(
    `/rest/v1/prospects?genre=eq.${encodeURIComponent(genre)}&email=not.is.null&select=id,name,email,area,genre,review_count&limit=${limit}&order=id.asc`
  );
  if (!prospects || prospects.length === 0) {
    console.error('対象の prospect が見つかりません');
    process.exit(1);
  }

  // 4. 未送信のみ絞り込み
  const targets = prospects.filter(p => !sentIds.has(p.id));
  console.log(`対象: ${prospects.length}件取得 / ${sentIds.size}件送信済みスキップ / ${targets.length}件送信予定\n`);

  if (targets.length === 0) { console.log('送信対象なし。終了。'); return; }

  // 5. SMTP transporter
  const transporter = isSend ? nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  }) : null;

  // 6. 送信ループ
  let successCount = 0;
  for (let i = 0; i < targets.length; i++) {
    const p = targets[i];
    const subject  = replaceVars(isSend ? tmpl.subject : `【テスト】${tmpl.subject}`, p);
    const bodyHtml = replaceVars(tmpl.body_html, p);

    if (!isSend) {
      console.log(`[${i + 1}/${targets.length}] dryRun`);
      console.log(`  宛先 : ${p.email}`);
      console.log(`  件名 : ${subject}`);
      console.log(`  本文 : ${bodyHtml.replace(/<[^>]+>/g, '').slice(0, 80)}...`);
      console.log('');
      continue;
    }

    try {
      const info = await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
        to: p.email,
        subject,
        html: bodyHtml,
      });

      await sbFetch('/rest/v1/salesbot_outreach', {
        method: 'POST',
        body: JSON.stringify({
          prospect_id: p.id,
          template_id: tmpl.id,
          sent_at: new Date().toISOString(),
          status: 'sent',
        }),
      });

      console.log(`[${i + 1}/${targets.length}] 送信成功: ${p.name} <${p.email}> / ${info.messageId}`);
      successCount++;
    } catch (err) {
      console.error(`[${i + 1}/${targets.length}] 送信失敗: ${p.name} <${p.email}> / ${err.message}`);
      await sbFetch('/rest/v1/salesbot_outreach', {
        method: 'POST',
        body: JSON.stringify({
          prospect_id: p.id,
          template_id: tmpl.id,
          sent_at: new Date().toISOString(),
          status: 'error',
        }),
      });
    }

    if (i < targets.length - 1) await sleep(5000);
  }

  if (isSend) console.log(`\n完了: ${successCount}/${targets.length}件 送信成功`);
}

main().catch(err => { console.error('致命的エラー:', err.message); process.exit(1); });
