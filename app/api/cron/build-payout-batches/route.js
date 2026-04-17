/**
 * GET /api/cron/build-payout-batches
 * Vercel Cron proxy — forwards to Railway Numok cron endpoint.
 * Schedule: 1st of each month at 2 AM UTC (0 2 1 * *)
 */
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const NUMOK_URL = 'https://numok-production.up.railway.app'
const CRON_SECRET = process.env.CRON_SECRET

export async function GET(req) {
  // Vercel cron sends this header — reject manual hits in production
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const res = await fetch(
      `${NUMOK_URL}/cron/build-payout-batches?secret=${CRON_SECRET}`,
      { method: 'GET' }
    )
    const data = await res.json()
    return Response.json(data, { status: res.status })
  } catch (err) {
    console.error('Cron build-payout-batches proxy error:', err)
    return Response.json({ error: 'Failed to reach Numok' }, { status: 502 })
  }
}
