import {atom} from "jotai";

const connectorAtom = atom(null)
export const $connectorAtom = atom<any, any>(
    (get) => get(connectorAtom),
    (_get, set, connector) => set(connectorAtom, connector)
)
