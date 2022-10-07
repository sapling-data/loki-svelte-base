import type { IconSource } from '@steeze-ui/svelte-icon/types';

export interface CloudMenuItem {
    title: string;
    summary: string;
    iconUrl: string;
    link: string;
    pageUrns: string[]
}

export interface NavItem {
    name: string;
    icon?: IconSource;
    component: any;
    to: string;
    description?: string;
    default?: boolean;
    guard?: () => boolean;
}
