<script lang="ts">
  import { onMount } from "svelte"
  import { theme } from "./theme"

  type ThemeType = "dark" | "light"

  interface Props {
    children?: import("svelte").Snippet<[{ theme: ThemeType }]>
  }

  let { children }: Props = $props()

  const THEME_DARK: ThemeType = "dark"
  const THEME_LIGHT: ThemeType = "light"

  let currTheme: ThemeType = $state(THEME_DARK)

  function setDarkTheme() {
    const root = window.document.documentElement
    root.classList.add(THEME_DARK)
    root.classList.remove(THEME_LIGHT)
    currTheme = THEME_DARK
  }
  function setLightTheme() {
    const root = window.document.documentElement
    root.classList.add(THEME_LIGHT)
    root.classList.remove(THEME_DARK)
    currTheme = THEME_LIGHT
  }

  function toggleTheme() {
    const root = window.document.documentElement
    root.classList.toggle(THEME_DARK)
    root.classList.toggle(THEME_LIGHT)
    currTheme = currTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK
    theme.set(currTheme)
  }

  onMount(() => {
    const isDarkQuery = window.matchMedia("(prefers-color-scheme: dark)")

    currTheme = isDarkQuery.matches ? THEME_DARK : THEME_LIGHT
    theme.set(currTheme)

    isDarkQuery.addEventListener("change", (e) => {
      if (e.matches) {
        setDarkTheme()
      } else {
        setLightTheme()
      }
      theme.set(currTheme)
    })
  })
</script>

<button class="mode-switcher" onclick={toggleTheme}>
  {@render children?.({ theme: currTheme })}
</button>

<style>
  .mode-switcher {
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    color: var(--gray-400);
  }
</style>
