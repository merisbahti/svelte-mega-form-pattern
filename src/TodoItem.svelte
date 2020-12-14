<script lang="ts">
  import type { Writable } from 'svelte/store'
  export let todoStore: Writable<{
    checked: boolean
    text: string
  }>
  export let remove: () => void
</script>

<li>
  <input type="checkbox" bind:checked={$todoStore.checked} />
  <input type="text" bind:value={$todoStore.text} />
  <button on:click={remove}>X</button>
</li>
