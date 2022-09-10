import { writable } from "svelte/store";

let array :{name: string, type: string}[] = []
export const fields = writable(array)