<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Router, Route, navigate } from 'svelte-routing';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import Sidebar from './lib/components/navigation/Sidebar.svelte';
  import Navbar from './lib/components/navigation/Navbar.svelte';
  import Workflow from './lib/pages/Workflow.svelte';
  import { appConfig } from './lib/config';
  const { allowNavToggle, displayCloudMenu, displayLogo, displayUserMenu, basePath, navItems, navMode, title } = appConfig;
  const queryClient = new QueryClient();
  $: showSidebar = true;
  $: minimal = false;
  onMount(async () => {
    if (import.meta.env.MODE === 'development' && !window.location.href.includes(basePath)) {
      navigate(basePath + '/', { replace: true });
    }
  });
  import Notifications from "./lib/components/Notifications.svelte";
  import {Icon} from "@steeze-ui/svelte-icon";
  import {SidebarExpand} from "@steeze-ui/octicons";
</script>

<QueryClientProvider>
  <Router>
    <div class="min-h-full flex grow relative">
      {#if navMode === 'sidebar'}
        {#if allowNavToggle && !showSidebar}
          <div
                  class="fixed bottom-0 left-0" style="z-index: 9000;"
                  in:fly={{duration: 500, x: -250, opacity: 1}}
          >
            <button
                    on:click={() => showSidebar = !showSidebar}
                    type="button"
                    class="rounded-tr-lg border-r border-t border-gray-300 shadow-sm text-gray-800 flex gap-2 items-center px-4 pb-2 pt-2 bg-gray-50
                    text-xxs hover:bg-gray-100 hover:text-gray-900"
            >
              <Icon src={SidebarExpand} class="h-3 w-3 rotate-180" />
              <span class="my-auto">Open sidebar</span>
            </button>
          </div>
        {/if}
        <Sidebar
                bind:minimal={minimal}
                bind:show={showSidebar}
                {allowNavToggle}
                {displayCloudMenu}
                {displayLogo}
                {displayUserMenu}
                {title}
                {navItems}
        />
      {/if}
      <div class="h-screen flex flex-col grow overflow-hidden">
        {#if appConfig.navMode === 'navbar'}
          <Navbar
                  {title}
                  {navItems}
                  {displayCloudMenu}
                  {displayLogo}
                  {displayUserMenu}
          />
        {/if}
        <div class="relative flex-grow w-full overflow-y-auto">
          <Notifications />
          {#each navItems as item }
            <Route
                    path={item.to}
                    component={item.component}
            />
          {/each}
          <Route
                  path={`${basePath}/workflows/:workflowId`}
                  let:params
          >
            <Workflow workflowId={params.workflowId} />
          </Route>
        </div>
      </div>
    </div>
  </Router>
</QueryClientProvider>

