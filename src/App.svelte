<script lang="ts">
  import { writable } from 'svelte/store'
  import TodoList from './TodoList.svelte'
  const todoAtom = writable([{ checked: false, text: 'poop' }])
</script>

<h1>Hello there</h1>
<TodoList todoItems={todoAtom} />
<pre>{JSON.stringify($todoAtom, null, 2)}</pre>
