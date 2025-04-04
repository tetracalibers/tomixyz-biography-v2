<script lang="ts">
  import { onMount } from "svelte"

  interface Props {
    as?: keyof HTMLElementTagNameMap
    text: string
    backgroundColor?: string
    [key: string]: any
  }

  let { as = "span", text, backgroundColor = "rgb(241,245,249)", ...rest }: Props = $props()

  let el: HTMLElement
  let wrapperEl: HTMLSpanElement
  let isOverflowRight = $state(false)
  let isOverflowLeft = $state(false)

  onMount(() => {
    console.log(el)
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const element = entry.target as HTMLElement
        const isOverflow = element.offsetWidth < element.scrollWidth
        if (!isOverflow) return
        isOverflowRight = entry.intersectionRatio === 1
        isOverflowLeft = entry.intersectionRatio !== 1
      },
      {
        root: wrapperEl,
        threshold: 1.0
      }
    )
    intersectionObserver.observe(el)

    return () => intersectionObserver.disconnect()
  })
</script>

<div
  class="shadow-area"
  class:shadowRight={isOverflowRight}
  class:shadowLeft={isOverflowLeft}
  style:--background={backgroundColor}
>
  <div class="wrapper" bind:this={wrapperEl}>
    <svelte:element this={as} bind:this={el} class="text" {...rest}>
      {text}
    </svelte:element>
  </div>
</div>

<style>
  .wrapper {
    overflow-y: hidden;
  }

  .shadow-area {
    --transparent: rgba(255, 255, 255, 0);
  }

  .shadowRight {
    -webkit-mask-image: linear-gradient(to right, var(--background) 90%, var(--transparent));
    mask-image: linear-gradient(to right, var(--background) 90%, var(--transparent));
  }

  .shadowLeft {
    -webkit-mask-image: linear-gradient(to left, var(--background) 90%, var(--transparent));
    mask-image: linear-gradient(to left, var(--background) 90%, var(--transparent));
  }

  .text {
    min-width: fit-content;
  }
</style>
