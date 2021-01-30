<script lang="ts">
  import type { Writable } from 'svelte/store'
  import focusStore from './focusStore'
  export let todoStore: Writable<{
    checked: boolean
    text: string
  }>
  export let remove: () => void
  let checked = focusStore(todoStore, (optic) => optic.prop('checked'))
  let text = focusStore(todoStore, (optic) => optic.prop('text'))
</script>

<li>
  <input type="checkbox" bind:checked={$checked} />
  <input type="text" bind:value={$text} />
  <button on:click={remove}>X</button>
</li>
