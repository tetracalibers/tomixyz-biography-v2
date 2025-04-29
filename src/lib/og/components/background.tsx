import React from "react"

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const floor2 = (n: number) => Math.floor(n * 100) / 100

const padding = floor2(OG_WIDTH * (1 - 0.875) * 0.5)
const innerWidth = OG_WIDTH - padding * 2
const innerHeight = OG_HEIGHT - padding * 2

export const Background = () => (
  <svg width={OG_WIDTH} height={OG_HEIGHT} viewBox={`0 0 ${OG_WIDTH} ${OG_HEIGHT}`}>
    <defs>
      <filter id="blurOpacity">
        <feGaussianBlur stdDeviation="60" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
      </filter>

      <radialGradient id="grad1" cx="92.95%" cy="50%" r="105.68%" fx="92.95%" fy="50%">
        <stop offset="0%" stop-color="rgb(105,244,253)" stop-opacity="0.5" />
        <stop offset="53.91%" stop-color="rgb(160,255,244)" stop-opacity="0.095" />
        <stop offset="100%" stop-color="rgb(254,216,255)" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="grad2" cx="90.11%" cy="102.39%" r="103.18%" fx="90.11%" fy="102.39%">
        <stop offset="0%" stop-color="rgb(201,255,242)" stop-opacity="1" />
        <stop offset="100%" stop-color="rgb(230,255,250)" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="grad3" cx="87.84%" cy="9.55%" r="90.45%" fx="87.84%" fy="9.55%">
        <stop offset="0%" stop-color="rgb(255,210,245)" stop-opacity="1" />
        <stop offset="100%" stop-color="rgb(254,219,246)" stop-opacity="0" />
      </radialGradient>

      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="14.89%" stop-color="rgb(203,185,255)" stop-opacity="0.8" />
        <stop offset="74.33%" stop-color="rgb(216,202,254)" stop-opacity="0" />
      </linearGradient>
    </defs>

    <rect fill="white" width={OG_WIDTH} height={OG_HEIGHT} />
    <g filter="url(#blurOpacity)">
      <rect width={OG_WIDTH} height={OG_HEIGHT} fill="url(#grad1)" />
      <rect width={OG_WIDTH} height={OG_HEIGHT} fill="url(#grad2)" />
      <rect width={OG_WIDTH} height={OG_HEIGHT} fill="url(#grad3)" />
      <rect width={OG_WIDTH} height={OG_HEIGHT} fill="url(#grad4)" />
    </g>

    <rect fill="white" fill-opacity="0.8" rx="4" width={innerWidth} height={innerHeight} x={padding} y={padding} />
  </svg>
)
