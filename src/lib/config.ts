import lokiConfig from '../../loki.config.mjs';
import Welcome from './pages/Welcome.svelte';
import { BookOpen, Home } from '@steeze-ui/heroicons';
import Index from './pages/Index.svelte';
import type { NavItem } from './types';

const basePath: string =
  import.meta.env.MODE === 'development'
    ? `/${lokiConfig.appName}/pages/urn/com/${lokiConfig.cloudName}/${lokiConfig.appModelName}/app/pages/${lokiConfig.pageName}/v`
    : `/${loki.urn.getLastSegment(loki.app.appInstanceUrn)}/pages/urn/com/${
        lokiConfig.appRoot
      }/${lokiConfig.appModelName}/app/pages/${lokiConfig.pageName}/v`;

interface AppConfig {
  title: string;
  basePath: string;
  navMode: string;
  navItems: NavItem[];
  allowNavToggle: boolean;
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
  displayLogo: true,
  displayCloudMenu: true,
  displayUserMenu: true,
  thinNavbar: false,
  darkByDefault: true,
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
  ],
};
