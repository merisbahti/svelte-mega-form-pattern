import { writable, Writable } from 'svelte/store'

const localStorageStore = <T>(
  defaultValue: T,
  key: string,
  validator: (storedValue: unknown) => storedValue is T,
): Writable<T> => {
  const initialValue = JSON.parse(localStorage.getItem(key))
  const store = writable(validator(initialValue) ? initialValue : defaultValue)
  return {
    subscribe: store.subscribe,
    set: (value) => {
      localStorage.setItem(key, JSON.stringify(value))
      store.set(value)
    },
    update: (updater) => {
      store.update((oldValue) => {
        const newValue = updater(oldValue)
        localStorage.setItem(key, JSON.stringify(newValue))
        return newValue
      })
    },
  }
}

export default localStorageStore
