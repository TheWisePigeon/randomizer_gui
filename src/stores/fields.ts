import { writable } from "svelte/store";

export const fields = writable(['email', 'name', 'password'])