import { resend } from '@/lib/resend'

export async function GET() {
  try {
    const { data, error } = await resend.audiences.list()
    if (error) return Response.json({ error }, { status: 500 })
    return Response.json({ audiences: data })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
