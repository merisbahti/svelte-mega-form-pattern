import { Equivalence, Iso, Lens, optic, get as opticGet, set, modify as opticModify } from 'optics-ts'
import type { Writable } from 'svelte/store'

function focusStore<Value, FocusedValue>(
    baseAtom: Writable<Value>,
    opticCallback: (
        optic: Equivalence<Value, any, Value>,
    ) =>
        | Equivalence<Value, any, FocusedValue>
        | Iso<Value, any, FocusedValue>
        | Lens<Value, any, FocusedValue>
): Writable<FocusedValue> {
    const focus = opticCallback(optic<Value>())
    switch (focus._tag) {
        case 'Iso':
        case 'Equivalence':
        case 'Lens':
            return {
                subscribe: (listener) => {
                    const subSub = baseAtom.subscribe((superArray) => {
                        const focusedValue = opticGet(focus)(superArray)
                        listener(focusedValue)
                    })
                    return subSub
                },
                set: (value) => { baseAtom.update(set(focus)(value)) },
                update: (updater) => { baseAtom.update(opticModify(focus)(updater)) }
            }
    }
}

export default focusStore
