<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Router, Route, navigate } from 'svelte-routing';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import Sidebar from './lib/components/navigation/Sidebar.svelte';
  import Navbar from './lib/components/navigation/Navbar.svelte';
  import Workflow from './lib/pages/Workflow.svelte';
  import { appConfig } from './lib/config';
  const { allowNavToggle, basePath, navItems, navMode, title } = appConfig;
  const queryClient = new QueryClient();
  $: showSidebar = true;
  onMount(async () => {
    if (import.meta.env.MODE === 'development' && !window.location.href.includes(basePath)) {
      navigate(basePath + '/', { replace: true });
    }
  });
  import Notifications from "./lib/components/Notifications.svelte";
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
                    class="rounded-tr-lg border-r border-t border-gray-300 shadow-sm text-gray-800 flex items-center px-2 py-1.5 bg-gray-50
                    text-xxs hover:bg-gray-100 hover:text-gray-900"
            >
              <div class="flex my-auto">
                <svg
                        class="h-5 w-5 mr-2"
                        stroke-width="1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 21L5 21C3.89543 21 3 20.1046 3 19L3 5C3 3.89543 3.89543 3 5 3L19 3C20.1046 3 21 3.89543 21 5L21 19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.5 21V3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5.5 10L7.25 12L5.5 14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="mr-2">Open sidebar</span>
              </div>
            </button>
          </div>
        {/if}
        <Sidebar
                bind:show={showSidebar}
                {allowNavToggle}
                {title}
                {navItems}
        />
      {/if}
      <div class="h-screen flex flex-col grow overflow-hidden">
        {#if appConfig.navMode === 'navbar'}
          <Navbar
                  {title}
                  {navItems}
          />
        {/if}
        <div class="relative flex-grow w-full py-4 sm:px-6 lg:px-8 overflow-y-auto">
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
