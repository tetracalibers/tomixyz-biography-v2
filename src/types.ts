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

// ref: https://github.com/type-challenges/type-challenges/issues/3570
export type ReplaceKeys<U, T, Y> = { [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K] }

// ref: https://github.com/type-challenges/type-challenges/issues/3180
export type RequiredByKeys<T, K extends keyof T = keyof T, O = Omit<T, K> & { [P in K]-?: T[P] }> = {
  [P in keyof O]: O[P]
}
