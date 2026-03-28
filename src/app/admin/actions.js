'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function updateShop(shopId, formData) {
  const { error } = await supabaseAdmin
    .from('shops')
    .update({
      name: formData.get('name'),
      master_prompt: formData.get('master_prompt') || null,
      coupon_text: formData.get('coupon_text') || null,
      default_notify_days: Number(formData.get('default_notify_days')) || 30,
    })
    .eq('id', shopId)

  if (error) {
    return { success: false, message: error.message }
  }

  revalidatePath('/admin')
  return { success: true, message: '保存しました' }
}
