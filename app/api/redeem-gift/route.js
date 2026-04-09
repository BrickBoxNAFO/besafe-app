import { createAdminSupabaseClient } from '@/lib/supabase-server'
export async function POST(req) {
  try {
    const { token, userId } = await req.json()
    if (!token || !userId) return Response.json({ error: 'Missing token or user ID' }, { status: 400 })
    const supabase = createAdminSupabaseClient()
    const { data: gift, error } = await supabase.from('gift_purchases').select('*').eq('token', token).eq('redeemed', false).single()
    if (error || !gift) return Response.json({ error: 'Invalid or already used gift token' }, { status: 400 })
    const { error: purchaseError } = await supabase.from('purchases').insert({ user_id: userId, package_id: gift.package_id, stripe_payment_intent: 'gift_' + gift.token })
    if (purchaseError && purchaseError.code !== '23505') return Response.json({ error: 'Failed to grant access' }, { status: 500 })
    await supabase.from('gift_purchases').update({ redeemed: true, redeemed_by: userId, redeemed_at: new Date().toISOString() }).eq('token', token)
    return Response.json({ success: true, packageId: gift.package_id })
  } catch (err) { return Response.json({ error: 'Server error' }, { status: 500 }) }
}