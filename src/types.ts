export type NavItems = {
  [key: string]: NavItem
}

export type NavItem = {
  path: string
  title: string
}

export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never
