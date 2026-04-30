'use server'

import { db } from '@/lib/firebase'
import { revalidatePath } from 'next/cache'

export async function updateShop(shopId, formData) {
  try {
    await db.collection('shops').doc(shopId).update({
      name: formData.get('name'),
      master_prompt: formData.get('master_prompt_clear') === '1'
        ? null
        : formData.get('master_prompt') || formData.get('master_prompt_current') || null,
      coupon_text: formData.get('coupon_text_clear') === '1'
        ? null
        : formData.get('coupon_text') || formData.get('coupon_text_current') || null,
      default_notify_days: Number(formData.get('default_notify_days')) || 30,
      google_review_url: formData.get('google_review_url') || null,
      review_request_message: formData.get('review_request_message') || null,
      revisit_message_template: formData.get('revisit_message_template') || null,
    })
  } catch (e) {
    return { success: false, message: e.message }
  }

  revalidatePath('/admin')
  return { success: true, message: '保存しました' }
}
