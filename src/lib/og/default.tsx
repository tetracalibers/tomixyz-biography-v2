import React from "react"
import { SITE } from "$/config"
import { LayoutRoot } from "./components/layout-root"

export const createDefaultOgImage = (logoDataUrl: string) => (
  <LayoutRoot>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        height: "100%"
      }}
    >
      <div style={{ display: "flex", filter: "contrast(1.1)" }}>
        <img src={logoDataUrl} width={200} />
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "3rem"
        }}
      >
        {SITE.name}
      </div>
    </div>
  </LayoutRoot>
)
