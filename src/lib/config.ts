import lokiConfig from '../../loki.config.mjs';
import Welcome from './pages/Welcome.svelte';
import { BookOpen, Home } from '@steeze-ui/heroicons';
import Index from './pages/Index.svelte';
import type { NavItem } from './types';
import Docs from "./pages/Docs.svelte";

const basePath: string = import.meta.env.MODE === 'development' ? `/${lokiConfig.appName}/dashboard/` : `/${loki.urn.getLastSegment(loki.app.appInstanceUrn)}/dashboard/`;

interface AppConfig {
  title: string;
  basePath: string;
  navMode: string;
  navItems: NavItem[];
  allowNavToggle: boolean;
  allowNavClose: boolean;
  displayLogo: boolean;
  displayCloudMenu: boolean;
  displayUserMenu: boolean;
  thinNavbar: boolean;
  darkByDefault: boolean;
}

export const appConfig: AppConfig = {
  basePath,
  title: lokiConfig.pageTitle,
  navMode: 'sidebar',
  allowNavToggle: true,
  allowNavClose: false,
  displayLogo: true,
  displayCloudMenu: true,
  displayUserMenu: false,
  thinNavbar: false,
  darkByDefault: false,
  navItems: [
    {
      name: 'Welcome',
      to: `${basePath}/`,
      component: Welcome,
      icon: Home,
      default: true,
    },
    {
      name: 'Index',
      to: `${basePath}/workflows`,
      component: Index,
      icon: BookOpen,
    },
    {
      name: 'Docs',
      to: `${basePath}/docs`,
      component: Docs,
      icon: BookOpen,
    },
  ],
};
