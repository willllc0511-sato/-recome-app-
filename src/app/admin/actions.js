'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function updateShop(shopId, formData) {
  const { error } = await supabaseAdmin
    .from('shops')
    .update({
      name: formData.get('name'),
      master_prompt: formData.get('master_prompt_clear') === '1'
        ? null
        : formData.get('master_prompt') || formData.get('master_prompt_current') || null,
      coupon_text: formData.get('coupon_text_clear') === '1'
        ? null
        : formData.get('coupon_text') || formData.get('coupon_text_current') || null,
      default_notify_days: Number(formData.get('default_notify_days')) || 30,
      google_review_url: formData.get('google_review_url') || null,
    })
    .eq('id', shopId)

  if (error) {
    return { success: false, message: error.message }
  }

  revalidatePath('/admin')
  return { success: true, message: '保存しました' }
}
