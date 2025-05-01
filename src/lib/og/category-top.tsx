import React from "react"
import { LayoutRoot } from "./components/layout-root"
import { Logo } from "./components/logo"
import { SiteName } from "./components/site-name"

export const createCategoryTopOgImage = (logoDataUrl: string, title: string, subtitle: string) => (
  <LayoutRoot>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Logo logoDataUrl={logoDataUrl} width={180} />
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
        <SiteName fontSize="2rem" />
      </div>
    </div>
  </LayoutRoot>
)
