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
        justifyContent: "center",
        alignItems: "center",
        gap: "1.6rem",
        color: "#295F98"
      }}
    >
      <div
        style={{
          display: "flex",
          transform: "scale(1.2)"
        }}
      >
        <CategoryName text={title} fontSize="4.5rem" />
      </div>
      <div style={{ display: "flex", fontSize: "2.5rem" }}>{subtitle}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem"
        }}
      >
        <Logo logoDataUrl={logoDataUrl} width={100} />
        <SiteName fontSize="2.5rem" />
      </div>
    </div>
  </LayoutRoot>
)
