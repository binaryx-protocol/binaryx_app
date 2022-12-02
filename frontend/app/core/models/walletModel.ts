import {atom} from "jotai";
import {Connector} from "wagmi";


const connectorAtom = atom(null)
export const $connectorAtom = atom<any, any>(
    (get) => get(connectorAtom),
    (_get, set, connector) => set(connectorAtom, connector)
)