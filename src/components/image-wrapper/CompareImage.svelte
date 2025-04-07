<script lang="ts">
  let { image1, image2, pos = 50 } = $props()

  let container: HTMLDivElement | null = null

  let persentage = $state(pos)
</script>

<div bind:this={container} class="c-compare" style={`--value: ${persentage}%;`}>
  <img class="c-compare__left" src={image1} alt="" />
  <img class="c-compare__right" src={image2} alt="" />
  <input
    type="range"
    class="c-rng c-compare__range"
    min="0"
    max="100"
    value={pos}
    oninput={(e: Event) => {
      const target = e.target as HTMLInputElement
      persentage = target.valueAsNumber
    }}
  />
</div>

<style>
  .c-compare {
    --h: 9;
    --w: 16;
    --thumb-bgc: rgba(255, 255, 255, 0.5);
    --thumb-bgc-focus: rgba(255, 255, 255, 0.8);
    --thumb-w: 0.5rem;

    display: grid;
  }
  .c-compare__left,
  .c-compare__right {
    height: auto;
    width: 100%;
    user-select: none;

    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
  .c-compare__left {
    clip-path: polygon(0% 0%, var(--value) 0%, var(--value) 100%, 0% 100%);
  }
  .c-compare__right {
    clip-path: polygon(100% 0%, var(--value) 0%, var(--value) 100%, 100% 100%);
  }
  .c-compare__range {
    background-color: transparent;
    box-sizing: border-box;
    font-family: inherit;
    height: 100%;
    margin: 0;
    outline: none;
    position: relative;
    width: 100%;

    grid-column: 1 / -1;
    grid-row: 1 / -1;
    z-index: 1;
  }
  .c-compare__range::-moz-range-thumb {
    background-color: var(--thumb-bgc);
    cursor: ew-resize;
    height: 100%;
    width: var(--thumb-w);
  }
  .c-compare__range::-webkit-slider-thumb {
    background-color: var(--thumb-bgc);
    cursor: ew-resize;
    height: 100%;
    width: var(--thumb-w);
  }
  .c-compare__range:focus::-webkit-slider-thumb {
    background-color: var(--thumb-bgc-focus);
    box-shadow: 0 0 0 2px var(--thumb-bgc);
  }
  .c-compare__range:focus::-moz-range-thumb {
    background-color: var(--thumb-bgc-focus);
    box-shadow: 0 0 0 2px var(--thumb-bgc);
  }
  .c-compare__range::-moz-range-track {
    background: transparent;
    background-size: 100%;
    box-sizing: border-box;
  }
  .c-compare__range::-webkit-slider-runnable-track {
    background: transparent;
    background-size: 100%;
    box-sizing: border-box;
    height: 100%;
  }
  .c-compare__range,
  .c-compare__range::-webkit-slider-runnable-track,
  .c-compare__range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
  }
</style>
