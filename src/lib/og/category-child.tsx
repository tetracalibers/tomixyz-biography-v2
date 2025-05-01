import React from "react"
import { SITE } from "$/config"
import { adjustMixedLangText } from "./components/text"
import { LayoutRoot } from "./components/layout-root"
import { Logo } from "./components/logo"

export const createCategoryChildOgImage = (logoDataUrl: string, title: string, category: string) => (
  <LayoutRoot>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem"
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "2.5rem",
            background: "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);",
            backgroundClip: "text",
            color: "transparent",
            filter: "saturate(2)"
          }}
        >
          {category}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            fontSize: "2.25rem",
            maxWidth: "550px",
            textAlign: "center"
          }}
        >
          {adjustMixedLangText(title)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem"
        }}
      >
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
        <Logo logoDataUrl={logoDataUrl} width={150} />
      </div>
    </div>
  </LayoutRoot>
)
