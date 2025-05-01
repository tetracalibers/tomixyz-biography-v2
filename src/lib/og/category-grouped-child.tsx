import React from "react"
import { adjustMixedLangText } from "./components/text"
import { LayoutRoot } from "./components/layout-root"
import { Logo } from "./components/logo"
import { SiteName } from "./components/site-name"
import { CategoryName } from "./components/category-name"

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
          <CategoryName fontSize="2rem" text={category} />
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
        <SiteName fontSize="2rem" />
        <Logo logoDataUrl={logoDataUrl} width={150} />
      </div>
    </div>
  </LayoutRoot>
)
