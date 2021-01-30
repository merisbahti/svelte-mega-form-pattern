<script lang="ts">
  import localStorageStore from './local-storage-store'
  import TodoList from './TodoList.svelte'
  import * as io from 'io-ts'
  const todoAtom = localStorageStore(
    [{ checked: false, text: 'do some stuff' }],
    'store',
    io.array(io.type({ checked: io.boolean, text: io.string })).is,
  )
</script>

<h1>Hello there</h1>
<TodoList todoItems={todoAtom} />
