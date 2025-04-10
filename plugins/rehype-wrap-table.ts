import { visit } from "unist-util-visit"
import type { Element, Root } from "hast"
import type { Plugin } from "unified"

const rehypeWrapTable: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.type === "element" && node.tagName === "table" && parent && typeof index === "number") {
        const wrapper: Element = {
          type: "element",
          tagName: "div",
          properties: {
            className: ["markdown-table-wrapper"]
          },
          children: [node]
        }

        parent.children[index] = wrapper
      }
    })
  }
}

export default rehypeWrapTable
