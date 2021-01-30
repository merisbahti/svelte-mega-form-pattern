# store-oriented (storiented) state in svelete
Many time the *state*- and *component*-trees are orthagonal to eachother. 
This repo is a demo of how the global store, can flow _with_ the component tree.

## How do we accomplish this?

  1. We allow the passing of Stores as component properties.
  2. We use the `slicedStore` utility to "slice" a Store of a list, into a list of stores that can be mapped out by components.

## Explaination

### App
App creates a store, todoItems, (a localstorage store) that contains a list of todos. This store is passed as a prop to the `TodoItem`.

### TodoList
`TodoList` receives a prop `Writable<Todo[]>`, but this contains a list. The `TodoItem` expects to be given just a todoitem `Writable<Todo>`. To slice out the todoitems from the store, the `sliceStore` utility is used. Note that the `sliceStore` utility returns writable stores that can be removed using an extra method called `remove`. Also, if the TodoList changes in size, the TodoList is updated with a new list of todo-stores.

### TodoItem
The TodoItem is given a `Writable<Todo>`, and happily renders components to manipulate this store. It is happily unaware of any global state, or any context it exists in. It has no global dependencies.


# Future:

  NYI - For more complicated examples, we'll be implementing `focusAtom` from [klyva](https://github.com/merisbahti/klyva). This will give us the superpowers of optics, i.e. Lenses, Prisms and Isomorphisms. This helps us transform our stores into stores that are easier for manipulation.