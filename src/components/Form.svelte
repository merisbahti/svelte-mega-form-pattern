<script lang="ts">
  import type { Writable } from 'svelte/store'
  import Field from './Field.svelte'
  import focusStore from '../cleavers/focusStore'
  import { slicedStore } from '../cleavers/slicedStore'

  export let name: Writable<string>
  export let form: Writable<Record<string, string>>

  export let remove: () => void

  const formEntries = focusStore(form, (optic) =>
    optic.iso(
      (object) => Object.entries(object),
      (entries) => Object.fromEntries(entries),
    ),
  )
  const formSlices = slicedStore(formEntries)

  const addNewField = () => {
    formEntries.update((old) => {
      return [...old, ['field nr: ' + old.length, 'value']]
    })
  }
</script>

<li>
  <div>
    <input type="text" bind:value={$name} /><button on:click={remove}>X</button>
  </div>
  <ul>
    {#each $formSlices as field}
      <Field
        name={focusStore(field, (optic) => optic.nth(0))}
        value={focusStore(field, (optic) => optic.nth(1))}
        remove={field.remove} />
    {/each}
    <button on:click={addNewField}>Add new field</button>
  </ul>
</li>
