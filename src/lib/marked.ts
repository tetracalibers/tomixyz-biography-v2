import type { Renderer, Tokens } from "marked"

export const setExternalLinkRenderer = (renderer: Renderer) => {
  // aタグを上書き
  renderer.link = function ({ href, title, tokens }: Tokens.Link) {
    const titleAttr = title ? ` title="${title}"` : ""
    const text = tokens.map((token) => token.raw).join("")
    return `<a href="${href}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`
  }
}
