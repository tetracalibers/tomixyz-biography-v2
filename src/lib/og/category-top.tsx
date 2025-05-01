import React from "react"
import { LayoutRoot } from "./components/layout-root"
import { Logo } from "./components/logo"
import { SiteName } from "./components/site-name"
import { CategoryName } from "./components/category-name"

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
        <CategoryName fontSize="4rem" text={title} />
        <div style={{ display: "flex", fontSize: "1.5rem" }}>{subtitle}</div>
        <SiteName fontSize="2rem" />
      </div>
    </div>
  </LayoutRoot>
)
