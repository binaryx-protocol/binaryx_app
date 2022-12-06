import {atom} from "jotai";

const connectorAtom = atom(null)
export const $connectorAtom = atom<any, any>(
    (get) => get(connectorAtom),
    (_get, set, connector) => {
      if(connector){
        set(connectorAtom, connector)
      }
    }
)
export const $isConnectedAccount = atom<string>('');

