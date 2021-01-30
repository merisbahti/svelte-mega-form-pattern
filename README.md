# store-oriented (storiented) state in svelete
Many time the *state*- and *component*-trees are orthagonal to eachother. 
This repo is a demo of how the global store, can flow _with_ the component tree.

## How do we accomplish this?

  1. We allow the passing of Stores as component properties.
  2. We use the `slicedStore` utility to "slice" a Store of a list, into a list of stores that can be mapped out by components.
  3. We use the `focusStore` utility to "focus" on the store, using optics, to create a store that's easier for us to operate on. For example isomorphic transformations, to transform an object to an array using `Object.entries`, and then transforming it back using `Object.fromEntries`.

This might sound complicated, but learning these two utilities can make building applications much easier.
This only acknowledges common patterns of building applications, and makes them easier by not having to 
leave the "Store" context.

## Explaination

The application renders an object (formList), which contains 36 forms. 
Each of these forms contains a number of fields. 
In order to make the application scalable, it has been split up into three components, 
each with its own responsibility.

Please take a look in the `src/components` directory, the component hierarchy is like this:

```
App.svelte
 L MegaForm.svelte
    L Form.svelte
       L Field.svelte
```

I suggest starting at `Field.svelte`, working your way up.

### Field
A component that takes two props: `name`, `value`, both being a `Writable<string>`. 
Nothing special about this one, the component doesn't know anything about a global state. 
All it is responsible for is its name- and value-attributes.

### Form
A component that takes two props

  * `name: Writable<string>`: The name of the form. This is just bound to an input so that the user can control/view the value.
  * `form: Writable<Record<string, string>>`: An object containing all the names/values of the fields.

Ok so what's going on here? We transform the `form`-store, using the `focusStore`-function, because we'd rather have a
store of tuples, first tuple being the `name` of the field, and second tuple being the `value` of the field. 
The reason we transform it back, is that the form is not a list of tuples, but an object, so the second argument to the
iso is for us to be able to apply updates to our `form`-store.

Additionally, we use the `slicedStore` utility to map out our list of tuples, creating a store for each item in the store.
This gives us a store, `formSlices`, that we subscribe to and map out each store to a `Field`-component.

### MegaForm
Similarily to how Form mutates its inputs, that's how `MegaForm` does it too.
