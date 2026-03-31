'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RestartCourseButton({ courseId }) {
  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const router = useRouter()

  async function handleRestart() {
    if (!confirm) { setConfirm(true); return; }
    setLoading(true)
    const res = await fetch('/api/restart-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId })
    })
    if (res.ok) { router.refresh(); setConfirm(false); }
    setLoading(false)
  }

  return (
    <button
      onClick={handleRestart}
      disabled={loading}
      className="text-sm font-semibold px-5 py-2.5 rounded-xl border-2 transition-all disabled:opacity-50"
      style={confirm ? {borderColor:'#EF4444',color:'#EF4444',background:'#FEF2F2'} : {borderColor:'#0EA5A0',color:'#0EA5A0',background:'transparent'}}
    >
      {loading ? 'Restarting...' : confirm ? '⚠️ Confirm — this will clear your progress' : '🔄 Restart Course'}
    </button>
  )
}