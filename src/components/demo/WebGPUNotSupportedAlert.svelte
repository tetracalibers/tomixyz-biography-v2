{#if !navigator.gpu}
  <div class="NotSupportAlert">
    <p>このブラウザはまだWebGPUをサポートしていません</p>
  </div>
{/if}

<style>
  .NotSupportAlert {
    margin-block: 0;
    margin-inline: calc(50% - 50vw);
    background: #ff70a6;
    text-align: center;
    font-weight: bold;
  }
  .NotSupportAlert p {
    color: aliceblue;
    font-size: 1.1rem;
    padding: 1rem;
    margin: 0;
  }
</style>
