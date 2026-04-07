'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

/**
 * Minimal, borderless video player for the HomeSafe homepage.
 * - Autoplays WITH sound on page load (falls back to muted if browser blocks)
 * - Shows: play/pause, volume, duration slider
 * - No border, blends seamlessly into the hero section
 */
export default function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // Attempt autoplay with sound; fall back to muted autoplay
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.volume = volume

    const tryPlay = async () => {
      try {
        await v.play()
        setPlaying(true)
      } catch {
        // Browser blocked unmuted autoplay — try muted
        v.muted = true
        setMuted(true)
        try {
          await v.play()
          setPlaying(true)
        } catch {
          // Autoplay fully blocked; user must click
          setPlaying(false)
        }
      }
    }
    tryPlay()
  }, [src]) // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const handleVolumeChange = useCallback((e) => {
    const val = parseFloat(e.target.value)
    const v = videoRef.current
    if (!v) return
    v.volume = val
    v.muted = val === 0
    setVolume(val)
    setMuted(val === 0)
  }, [])

  const handleSeek = useCallback((e) => {
    const val = parseFloat(e.target.value)
    const v = videoRef.current
    if (!v || !duration) return
    v.currentTime = (val / 100) * duration
  }, [duration])

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    setCurrentTime(v.currentTime)
    setProgress(duration ? (v.currentTime / duration) * 100 : 0)
  }, [duration])

  const onLoadedMetadata = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    setDuration(v.duration)
    setLoaded(true)
  }, [])

  const fmt = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  // Placeholder shown when no video src is provided yet
  if (!src) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-navy/40 flex items-center justify-center">
        <div className="text-white/30 text-center">
          <svg className="w-16 h-16 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium">Video Coming Soon</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden group">
      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        loop
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Click-to-play overlay (shown when paused and not loaded or user paused) */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Controls bar — appears on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-10 pb-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Progress / seek bar */}
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleSeek}
          className="video-slider w-full h-1 mb-3 cursor-pointer"
          style={{
            background: `linear-gradient(to right, #0EA5A0 ${progress}%, rgba(255,255,255,0.25) ${progress}%)`,
          }}
        />

        <div className="flex items-center gap-3">
          {/* Play/Pause */}
          <button onClick={togglePlay} className="text-white hover:text-teal transition-colors">
            {playing ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Time */}
          <span className="text-white/70 text-xs font-mono min-w-[70px]">
            {fmt(currentTime)} / {fmt(duration)}
          </span>

          <div className="flex-1" />

          {/* Volume */}
          <button onClick={toggleMute} className="text-white hover:text-teal transition-colors">
            {muted || volume === 0 ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-3.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            className="video-slider w-20 h-1 cursor-pointer"
            style={{
              background: `linear-gradient(to right, #0EA5A0 ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.25) ${(muted ? 0 : volume) * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
