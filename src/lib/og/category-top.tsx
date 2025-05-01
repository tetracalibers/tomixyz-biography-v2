import React from "react"
import { SITE } from "$/config"
import { LayoutRoot } from "./components/layout-root"

export const createCategoryTopOgImage = (logoDataUrl: string, title: string, subtitle: string) => (
  <LayoutRoot>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div
        style={{
          display: "flex",
          filter: "contrast(1.1)"
        }}
      >
        <img src={logoDataUrl} width={180} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.1rem"
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "4rem",
            background: "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);",
            backgroundClip: "text",
            color: "transparent",
            filter: "saturate(2)"
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: "1.5rem" }}>{subtitle}</div>
        <div
          style={{
            display: "flex",
            fontSize: "2rem",
            background: "linear-gradient(50deg, #6BBBFF 0%, #B8DCFF 48%, #6BBBFF 100%)",
            backgroundClip: "text",
            color: "rgba(253, 183, 234, 0.6)",
            filter: "saturate(2)"
          }}
        >
          {SITE.name}
        </div>
      </div>
    </div>
  </LayoutRoot>
)
