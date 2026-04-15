'use client'

import { useState, useRef, useEffect } from 'react'

export default function AudioPlayer({ src, title, subtitle, lyrics, variant = 'lesson', accentColor = '#16a34a' }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showLyrics, setShowLyrics] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
    }
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause() } else { audio.play().catch(() => {}) }
    setIsPlaying(!isPlaying)
  }

  const seek = (e) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audio.currentTime = pct * audio.duration
  }

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return m + ':' + sec.toString().padStart(2, '0')
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="p-3 flex items-center gap-3">
        <button onClick={togglePlay} className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors" style={{ background: accentColor }}>
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><rect x="2" y="1" width="3.5" height="12" rx="1" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white"><path d="M3 1.5v11l9-5.5z" /></svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{title}</p>
          {subtitle && <p className="text-white/50 text-xs truncate">{subtitle}</p>}
          <div className="mt-1.5 flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-white/10 cursor-pointer" onClick={seek}>
              <div className="h-full rounded-full transition-all" style={{ width: progress + '%', background: accentColor }} />
            </div>
            <span className="text-white/40 text-[10px] tabular-nums">{formatTime(audioRef.current?.currentTime)}</span>
          </div>
        </div>
        {lyrics && (
          <button onClick={() => setShowLyrics(!showLyrics)} className="text-white/40 hover:text-white/70 text-xs px-2 py-1 rounded transition-colors shrink-0">
            {showLyrics ? 'Hide' : 'Lyrics'}
          </button>
        )}
      </div>
      {showLyrics && lyrics && (
        <div className="px-4 pb-4 pt-1 border-t border-white/5">
          <pre className="text-white/60 text-xs leading-relaxed whitespace-pre-wrap font-sans max-h-48 overflow-y-auto">{lyrics}</pre>
        </div>
      )}
    </div>
  )
}
