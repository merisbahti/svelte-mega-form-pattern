<script lang="ts">
  import type { Writable } from 'svelte/store'
  import focusStore from '../cleavers/focusStore'
  import { slicedStore } from '../cleavers/slicedStore'
  import Form from './Form.svelte'

  export let formList: Writable<Record<string, Record<string, string>>>

  const entries = focusStore(formList, (optic) =>
    optic.iso(
      (object) => Object.entries(object),
      (entries) => Object.fromEntries(entries),
    ),
  )
  const sliced = slicedStore(entries)

  const addNewForm = () => {
    entries.update((old) => [...old, [`new form ${old.length}`, {}]])
  }
</script>

<ul>
  {#each $sliced as slice}
    <Form
      name={focusStore(slice, (optic) => optic.nth(0))}
      form={focusStore(slice, (optic) => optic.nth(1))}
      remove={slice.remove} />
  {/each}
  <button on:click={addNewForm}>Add new form</button>
</ul>
