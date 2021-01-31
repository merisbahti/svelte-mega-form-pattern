<script lang="ts">
  import type { Writable } from 'svelte/store'

  export let name: Writable<string>
  export let value: Writable<string>

  export let remove: () => void
</script>

<li>
  <input type="text" bind:value={$name} />
  <input type="text" bind:value={$value} />
  <button on:click={remove}>X</button>
</li>
