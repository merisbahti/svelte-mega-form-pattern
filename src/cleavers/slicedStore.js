import { get } from 'svelte/store';
export const slicedStore = (store) => {
    return {
        subscribe: (listen) => {
            let latestValue;
            const unsub = store.subscribe((value) => {
                if (!latestValue || value.length !== latestValue.length) {
                    const sliced = sliceStore(store);
                    latestValue = sliced;
                    listen(sliced);
                }
            });
            const unsubscribe = () => {
                unsub();
            };
            return unsubscribe;
        },
    };
};
const sliceStore = (store) => {
    const value = get(store);
    const sliceIsRemoved = (arr, index) => index >= arr.length;
    return value.map((_, index) => {
        let cachedValue;
        return {
            subscribe: (listener) => {
                const subSub = store.subscribe((superArray) => {
                    const newValue = superArray[index];
                    /** This conceptually signals that the slice at
                     * the index has "completed", and it should not update,
                     * nor return anything other than its cached value.
                     */
                    if (sliceIsRemoved(superArray, index)) {
                        return cachedValue;
                    }
                    cachedValue = newValue;
                    listener(cachedValue);
                });
                return subSub;
            },
            set: (newValue) => {
                store.update((oldValue) => {
                    if (sliceIsRemoved(oldValue, index)) {
                        return oldValue;
                    }
                    return [
                        ...oldValue.slice(0, index),
                        newValue,
                        ...oldValue.slice(index + 1),
                    ];
                });
            },
            update: (updater) => {
                store.update((oldValue) => {
                    if (sliceIsRemoved(oldValue, index)) {
                        return oldValue;
                    }
                    return [
                        ...oldValue.slice(0, index),
                        updater(oldValue[index]),
                        ...oldValue.slice(index + 1),
                    ];
                });
            },
            remove: () => {
                store.update((oldValue) => {
                    if (sliceIsRemoved(oldValue, index)) {
                        return oldValue;
                    }
                    return [...oldValue.slice(0, index), ...oldValue.slice(index + 1)];
                });
            },
        };
    });
};
//# sourceMappingURL=slicedStore.js.map