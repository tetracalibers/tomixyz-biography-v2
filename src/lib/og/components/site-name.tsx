import { SITE } from "$/config"
import React from "react"

interface Props {
  fontSize: string
}

export const SiteName = ({ fontSize }: Props) => (
  <div
    style={{
      display: "flex",
      background: "linear-gradient(50deg, #6BBBFF 0%, #B8DCFF 48%, #6BBBFF 100%)",
      backgroundClip: "text",
      color: "rgba(253, 183, 234, 0.6)",
      filter: "saturate(2)",
      fontSize
    }}
  >
    {SITE.name}
  </div>
)
