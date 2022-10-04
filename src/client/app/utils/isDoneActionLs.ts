import {fakeLs} from "./fakeLs";

const ls = typeof window !== 'undefined' ? window.localStorage : fakeLs

const NS = 'action.v1.'

export const isDoneAction = (actionName: string): boolean => !!ls.getItem(NS + actionName)
export const completeAction = (actionName: string): void => ls.setItem(NS + actionName, '1')
