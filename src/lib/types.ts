export interface CloudMenuItem {
    title: string;
    summary: string;
    iconUrl: string;
    link: string;
    pageUrns: string[]
}

export interface NavItem {
    name: string;
    icon?: any;
    component: any;
    to: string;
    description?: string;
}

export interface AppConfig {
    title: string;
    basePath: string;
    navMode: string;
    navItems: NavItem[];
    allowNavToggle: boolean;
}
