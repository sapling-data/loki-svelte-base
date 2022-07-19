import { readable, writable } from 'svelte/store';

export const count = writable(0);
export const message = writable('Hello, world!');
