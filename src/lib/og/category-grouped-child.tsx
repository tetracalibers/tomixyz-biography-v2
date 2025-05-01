import React from "react"
import { SITE } from "$/config"
import { adjustMixedLangText } from "./components/text"
import { LayoutRoot } from "./components/layout-root"

export const createCategoryGroupedChildOgImage = (
  logoDataUrl: string,
  title: string,
  category: string,
  subcategory: string
) => (
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
          gap: "1.25rem"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.75rem"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
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
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.75rem"
            }}
          >
            {adjustMixedLangText(subcategory)}
          </div>
        </div>
        <div
          style={{
            display: "flex",
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
        <div
          style={{
            display: "flex",
            filter: "contrast(1.1)"
          }}
        >
          <img src={logoDataUrl} width={150} />
        </div>
      </div>
    </div>
  </LayoutRoot>
)
