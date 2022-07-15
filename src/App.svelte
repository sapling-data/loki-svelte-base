<script lang="ts">
  import lokiConfig from '../loki.config';
  import type { NavItem } from './types';
  import { onMount } from 'svelte';
  import { Router, Route, navigate } from 'svelte-routing';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import { broadcastQueryClient } from '@sveltestack/svelte-query';
  import { Bookmark, BookOpen } from '@steeze-ui/heroicons';
  import Sidebar from "./lib/components/Sidebar.svelte";
  import Docs from './lib/Docs.svelte';
  import Navbar from './lib/components/Navbar.svelte';
  import HelloWorld from './lib/HelloWorld.svelte';

  const queryClient = new QueryClient();
  onMount(async () => {
      await broadcastQueryClient({
          queryClient,
          broadcastChannel: lokiConfig.appName,
      })
  });

  if (import.meta.env.MODE === 'development') onMount(() => navigate(basePath + '/', { replace: true }))

  export let navMode: string = lokiConfig.navMode;
  export let appTitle: string = lokiConfig.pageTitle;
  export let basePath: string = import.meta.env.MODE === 'development'
      ? `/${lokiConfig.appName}/pages/urn/com/${lokiConfig.cloudName}/${lokiConfig.appModelName}/app/pages/${lokiConfig.pageName}/v`
      : `/${loki.urn.getLastSegment(loki.app.appInstanceUrn)}/pages/urn/com/${lokiConfig.appRoot}/${lokiConfig.appModelName}/app/pages/${lokiConfig.pageName}/v`;
  export const navItems: NavItem[] = [
      {
          name: 'Hello World',
          href: '/',
          component: HelloWorld,
          icon: Bookmark
      },
      {
          name: 'Docs',
          href: '/docs',
          component: Docs,
          icon: BookOpen
      }
  ];
</script>
<QueryClientProvider>
  <Router>
    <div>
      <div class="h-screen flex overflow-hidden bg-white">
        {#if navMode === 'sidebar'}
          <Sidebar appTitle={appTitle} navItems={navItems} basePath={basePath} />
        {/if}
        <div class="flex flex-col w-0 flex-1 h-full overflow-hidden">
          {#if navMode === 'navbar'}
            <Navbar appTitle={appTitle} navItems={navItems} basePath={basePath} />
          {/if}
          <main id="main" class="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50 z-10">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              {#each navItems as item }
                <Route path={basePath + item.href} component={item.component} />
              {/each}
            </div>
          </main>
        </div>
      </div>
    </div>
  </Router>
</QueryClientProvider>
