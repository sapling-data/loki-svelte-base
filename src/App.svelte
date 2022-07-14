<script lang="ts">
  import lokiConfig from '../loki.config';
  import Docs from './lib/Docs.svelte';
  import Navbar from './lib/components/Navbar.svelte';
  import HelloWorld from './lib/HelloWorld.svelte';
  import { Router, Route, navigate } from 'svelte-routing';
  import { onMount } from 'svelte';
  import type { IconThemeSource } from '@steeze-ui/svelte-icon';
  import { Bookmark, BookOpen } from '@steeze-ui/heroicons';
  import Sidebar from "./lib/components/Sidebar.svelte";
  export const navItems: ({ name: string; icon: { default: IconThemeSource } & { [p: string]: IconThemeSource }; href: string })[] = [
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
  export let basepath = import.meta.env.MODE === 'development'
    ? `/${lokiConfig.appName}/pages/urn/com/${lokiConfig.cloudName}/${lokiConfig.appModelName}/app/pages/${lokiConfig.pageName}/v`
    : `/${loki.urn.getLastSegment(loki.app.appInstanceUrn)}/pages/urn/com/${lokiConfig.appRoot}/${lokiConfig.appModelName}/app/pages/${lokiConfig.pageName}/v`;

  if (import.meta.env.MODE === 'development') onMount(() => navigate(basepath + '/', { replace: true }))
  export let navMode: string = lokiConfig.navMode;
</script>

<Router>
  <div>
    <div class="h-screen flex overflow-hidden bg-white">
      {#if navMode === 'sidebar'}
        <Sidebar navItems={navItems} basepath={basepath} />
      {/if}
      <div class="flex flex-col w-0 flex-1 h-full overflow-hidden">
        {#if navMode === 'navbar'}
          <Navbar navItems={navItems} basepath={basepath} />
        {/if}
        <main id="main" class="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50">
          <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            {#each navItems as item }
              <Route path={basepath + item.href} component={item.component} />
            {/each}
          </div>
        </main>
      </div>
    </div>
  </div>
</Router>
