import { optic, get as opticGet, set, modify as opticModify } from 'optics-ts';
function focusStore(baseAtom, opticCallback) {
    const focus = opticCallback(optic());
    switch (focus._tag) {
        case 'Iso':
        case 'Equivalence':
        case 'Lens':
            return {
                subscribe: (listener) => {
                    const subSub = baseAtom.subscribe((superArray) => {
                        const focusedValue = opticGet(focus)(superArray);
                        listener(focusedValue);
                    });
                    return subSub;
                },
                set: (value) => { baseAtom.update(set(focus)(value)); },
                update: (updater) => { baseAtom.update(opticModify(focus)(updater)); }
            };
    }
}
export default focusStore;
//# sourceMappingURL=focusStore.js.map