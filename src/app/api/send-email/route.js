import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';

function replaceVars(str, vars) {
  return str
    .replace(/\{\{shop_name\}\}/g, vars.shop_name ?? '')
    .replace(/\{\{area\}\}/g, vars.area ?? '')
    .replace(/\{\{genre\}\}/g, vars.genre ?? '')
    .replace(/\{\{review_count\}\}/g, vars.review_count ?? '');
}

export async function POST(request) {
  try {
    const { to, subject, body_html, prospectId, templateId, dryRun, prospect } = await request.json();

    const resolvedSubject = prospect ? replaceVars(subject, prospect) : subject;
    const resolvedBody = prospect ? replaceVars(body_html, prospect) : body_html;

    if (!to || !resolvedSubject || !resolvedBody) {
      return Response.json({ error: 'to, subject, body_html は必須です' }, { status: 400 });
    }

    if (dryRun) {
      return Response.json({ dryRun: true, to, subject: resolvedSubject, body_html: resolvedBody });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject: resolvedSubject,
      html: resolvedBody,
    });

    if (prospectId && templateId) {
      try {
        await db.collection('salesbot_outreach').add({
          prospect_id: prospectId,
          template_id: templateId,
          sent_at: new Date().toISOString(),
        });
      } catch (dbError) {
        console.error('salesbot_outreach insert error:', dbError);
      }
    }

    return Response.json({ success: true, to, subject: resolvedSubject });
  } catch (err) {
    console.error('send-email error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
