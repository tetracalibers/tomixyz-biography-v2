import React from "react"

interface Props {
  logoDataUrl: string
  width: number
}

export const Logo = ({ logoDataUrl, width }: Props) => (
  <div style={{ display: "flex", filter: "contrast(1.1)" }}>
    <img src={logoDataUrl} width={width} />
  </div>
)
