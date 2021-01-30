<script lang="ts">
  import type { Writable } from 'svelte/store'
  import Field from './Field.svelte'
  import focusStore from '../cleavers/focusStore'
  import { slicedStore } from '../cleavers/slicedStore'

  export let name: Writable<string>
  export let form: Writable<Record<string, string>>

  let formEntries = focusStore(form, (optic) =>
    optic.iso(
      (object) => Object.entries(object),
      (entries) => Object.fromEntries(entries),
    ),
  )
  let formSlices = slicedStore(formEntries)
</script>

<li>
  <input type="text" bind:value={$name} />
  <ul>
    {#each $formSlices as field}
      <Field
        name={focusStore(field, (optic) => optic.nth(0))}
        value={focusStore(field, (optic) => optic.nth(1))} />
    {/each}
  </ul>
</li>
