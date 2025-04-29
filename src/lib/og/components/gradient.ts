export const defGradient = () => {
  return /* xml */ `
    <!-- ブラーとオパシティ用フィルター -->
    <filter id="blurOpacity">
      <feGaussianBlur stdDeviation="60" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.5" />
      </feComponentTransfer>
    </filter>

      <!-- グラデーション定義（stop-opacity版） -->
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
  `
}

export const gradient = (width: number, height: number, x: number, y: number) => {
  return /* xml */ `
    <!-- グラデーション重ね -->
    <g filter="url(#blurOpacity)">
      <rect width="${width}" height="${height}" x="${x}" y="${y}" fill="url(#grad1)" />
      <rect width="${width}" height="${height}" x="${x}" y="${y}" fill="url(#grad2)" />
      <rect width="${width}" height="${height}" x="${x}" y="${y}" fill="url(#grad3)" />
      <rect width="${width}" height="${height}" x="${x}" y="${y}" fill="url(#grad4)" />
    </g>
  `
}
