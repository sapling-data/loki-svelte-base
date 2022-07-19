import lokiConfig from '../../loki.config.mjs';
// @ts-ignore
import Welcome from './pages/Welcome.svelte';
import {BookOpen, Home} from '@steeze-ui/heroicons';
// @ts-ignore
import Index from './pages/Index.svelte';
import type { AppConfig } from '../types';

// @ts-ignore
const basePath = import.meta.env.MODE === 'development' ? `/${lokiConfig.appName}/pages/urn/com/${lokiConfig.cloudName}/${lokiConfig.appModelName}/app/pages/${lokiConfig.pageName}/v` : `/${loki.urn.getLastSegment(loki.app.appInstanceUrn)}/pages/urn/com/${lokiConfig.appRoot}/${lokiConfig.appModelName}/app/pages/${lokiConfig.pageName}/v`;

export const appConfig: AppConfig = {
  basePath,
  title: lokiConfig.pageTitle,
  navMode: 'sidebar',
  allowNavToggle: true,
  navItems: [
    {
      name: 'Welcome',
      to: `${basePath}/`,
      component: Welcome,
      icon: Home
    },
    {
      name: 'Index',
      to: `${basePath}/workflows`,
      component: Index,
      icon: BookOpen
    }
  ],
}

