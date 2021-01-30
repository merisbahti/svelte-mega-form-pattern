<script lang="ts">
  import type { Writable } from 'svelte/store'

  export let name: Writable<string>
  export let value: Writable<string>
</script>

<li>
  <input type="text" bind:value={$name} />
  <input type="text" bind:value={$value} />
</li>
