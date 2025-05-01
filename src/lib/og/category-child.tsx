import React from "react"
import { adjustMixedLangText } from "./components/text"
import { LayoutRoot } from "./components/layout-root"
import { Logo } from "./components/logo"
import { SiteName } from "./components/site-name"
import { CategoryName } from "./components/category-name"

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
        <CategoryName fontSize="2.5rem" text={category} />
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
        <SiteName fontSize="2rem" />
        <Logo logoDataUrl={logoDataUrl} width={150} />
      </div>
    </div>
  </LayoutRoot>
)
