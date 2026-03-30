import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#0B1F3A',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="110" height="120" viewBox="0 0 110 120" fill="none">
          <path
            d="M55 5 L105 30 L105 70 C105 95 80 112 55 118 C30 112 5 95 5 70 L5 30 Z"
            fill="white"
          />
          <path
            d="M40 55 C38 63 42 72 55 77 C68 72 72 63 70 55 C65 48 58 44 55 42 C52 44 45 48 40 55 Z"
            fill="#0B1F3A"
          />
        </svg>
      </div>
    ),
    { ...size }
  )
}
