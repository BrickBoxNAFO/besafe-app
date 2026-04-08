'use client'
import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * AudioPlayer component for lesson songs.
 *
 * Props:
 *   src        - URL of the MP3 file (Supabase Storage public URL)
 *   title      - Song title (e.g. "Stay Safe on the Road")
 *   subtitle   - Context line (e.g. "Early Road Safety - Lesson 1 of 3")
 *   lyrics     - String with lyrics (newlines preserved, supports [Verse 1], [Chorus] etc.)
 *   variant    - "lesson" (default, orange) or "remember" (teal, for recap songs)
 *   accentColor - Optional override colour
 */
export default function AudioPlayer({ src, title, subtitle, lyrics, variant = 'lesson', accentColor }) {
  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [lyricsOpen, setLyricsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [volume, setVolume] = useState(1)
  const [prevVolume, setPrevVolume] = useState(1)

  const isRemember = variant === 'remember'
  const accent = accentColor || (isRemember ? '#0EA5A0' : '#E8703A')
  const accentLight = accent + '20'
  const accentGlow = accent + '40'

  // Format seconds to mm:ss
  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return m + ':' + (sec < 10 ? '0' : '') + sec
  }

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    }
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
    }
  }, [src])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const seek = useCallback((e) => {
    const audio = audioRef.current
    const bar = progressRef.current
    if (!audio || !bar || !duration) return
    const rect = bar.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    audio.currentTime = (x / rect.width) * duration
  }, [duration])

  const handleVolume = useCallback((e) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
    if (v > 0) setPrevVolume(v)
  }, [])

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      setPrevVolume(volume)
      setVolume(0)
      if (audioRef.current) audioRef.current.volume = 0
    } else {
      setVolume(prevVolume)
      if (audioRef.current) audioRef.current.volume = prevVolume
    }
  }, [volume, prevVolume])

  const progress = duration ? (currentTime / duration) * 100 : 0

  // Parse lyrics into sections
  const parsedLyrics = lyrics ? lyrics.split('\n').map((line, i) => {
    const sectionMatch = line.match(/^\[(.*?)\]$/)
    if (sectionMatch) {
      return { type: 'label', text: sectionMatch[1], key: i }
    }
    return { type: 'line', text: line, key: i }
  }) : []

  if (!src) return null

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100" style={{ background: '#fff' }}>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Header */}
      <div
        className="px-5 py-4 flex items-center gap-4"
        style={{ background: isRemember ? 'linear-gradient(135deg, #0EA5A0 0%, #14b8a6 100%)' : 'linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 100%)' }}
      >
        {/* Music icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: isRemember ? 'rgba(255,255,255,0.15)' : 'rgba(232,112,58,0.15)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isRemember ? '#fff' : '#E8703A'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
          </svg>
        </div>

        {/* Title & subtitle */}
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-[13px] sm:text-[15px] leading-snug truncate">{title}</div>
          {subtitle && <div className="text-white/50 text-xs mt-0.5 truncate">{subtitle}</div>}
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Animated EQ bars when playing */}
          {isPlaying && (
            <div className="flex items-end gap-[3px] h-4 mr-1">
              {[0, 0.15, 0.3, 0.1].map((delay, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-sm"
                  style={{
                    background: isRemember ? '#fff' : '#E8703A',
                    animation: `eqBounce 0.8s ease-in-out ${delay}s infinite alternate`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Mute/unmute button */}
          <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors" aria-label={volume === 0 ? 'Unmute' : 'Mute'}>
            {volume === 0 ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : volume < 0.5 ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>

          {/* Volume slider - hidden on very small screens */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            className="volume-slider hidden sm:block"
            style={{ width: 70, background: `linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) ${volume * 100}%, rgba(255,255,255,0.25) ${volume * 100}%, rgba(255,255,255,0.25) 100%)` }}
            aria-label="Volume"
          />
        </div>
      </div>

      {/* Player controls */}
      <div className="px-5 py-4 bg-gray-50/80 border-b border-gray-100">
        <div className="flex items-center gap-4">
          {/* Play/pause button */}
          <button
            onClick={togglePlay}
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95"
            style={{ background: accent, boxShadow: '0 2px 8px ' + accentGlow }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 2 }}>
                <polygon points="6,3 20,12 6,21" />
              </svg>
            )}
          </button>

          {/* Progress bar */}
          <div className="flex-1">
            <div
              ref={progressRef}
              onClick={seek}
              className="w-full h-1.5 bg-gray-200 rounded-full cursor-pointer relative group"
            >
              <div
                className="h-full rounded-full relative transition-all"
                style={{
                  width: progress + '%',
                  background: `linear-gradient(90deg, ${accent}, ${isRemember ? '#2dd4bf' : '#f59e0b'})`,
                }}
              >
                {/* Scrubber dot */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: accent, boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
                />
              </div>
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-gray-400 tabular-nums">{fmt(currentTime)}</span>
              <span className="text-[11px] text-gray-400 tabular-nums">{fmt(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lyrics toggle & content */}
      {parsedLyrics.length > 0 && (
        <div>
          <button
            onClick={() => setLyricsOpen(!lyricsOpen)}
            className="w-full px-5 py-3 flex items-center justify-between text-sm font-semibold text-navy hover:bg-gray-50/60 transition-colors"
          >
            <span>Lyrics</span>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="text-gray-400 transition-transform"
              style={{ transform: lyricsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: lyricsOpen ? '500px' : '0px' }}
          >
            <div className="px-5 pb-5 overflow-y-auto" style={{ maxHeight: '460px' }}>
              <div className="text-[15px] leading-[1.9] text-gray-500">
                {parsedLyrics.map((item) => {
                  if (item.type === 'label') {
                    return (
                      <div key={item.key} className="mt-4 mb-1 text-[11px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                        {item.text}
                      </div>
                    )
                  }
                  if (item.text.trim() === '') {
                    return <div key={item.key} className="h-2" />
                  }
                  return <div key={item.key}>{item.text}</div>
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EQ animation keyframes + volume slider styles */}
      <style jsx global>{`
        @keyframes eqBounce {
          0% { height: 4px; }
          100% { height: 16px; }
        }
        .volume-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          background: rgba(255,255,255,0.25);
          outline: none;
          cursor: pointer;
          vertical-align: middle;
        }
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          border: none;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
          cursor: pointer;
          margin-top: -5px;
        }
        .volume-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          border: none;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        }
        .volume-slider::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 3px;
        }
        .volume-slider::-moz-range-track {
          height: 6px;
          border-radius: 3px;
          background: rgba(255,255,255,0.25);
        }
      `}</style>
    </div>
  )
}
