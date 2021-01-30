<script lang="ts">
  import type { Writable } from 'svelte/store'
  import focusStore from './focusStore'
  import { slicedStore } from './slicedStore'
  import Form from './Form.svelte'

  export let formList: Writable<Record<string, Record<string, string>>>

  let entries = focusStore(formList, (optic) =>
    optic.iso(
      (object) => Object.entries(object),
      (entries) => Object.fromEntries(entries),
    ),
  )
  let sliced = slicedStore(entries)
</script>

<ul>
  {#each $sliced as slice}
    <Form
      name={focusStore(slice, (optic) => optic.nth(0))}
      form={focusStore(slice, (optic) => optic.nth(1))} />
  {/each}
</ul>
