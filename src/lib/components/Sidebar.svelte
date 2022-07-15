<script lang="ts">
  import { Link, Router } from 'svelte-routing';
  import { Icon } from '@steeze-ui/svelte-icon';
  import CloudMenu from './menus/CloudMenu.svelte';
  import type { IconThemeSource } from '@steeze-ui/svelte-icon';
  import UserMenu from "./menus/UserMenu.svelte";
  export let navItems: ({ name: string; icon: { default: IconThemeSource } & { [p: string]: IconThemeSource }; href: string })[];
  export let basePath: string;
  export let appTitle: string;
</script>

<div class="bg-gray-800 flex flex-col w-56" id="sidebar">
  <div class="flex flex-col h-0 flex-1">
    <div class="flex items-center flex-shrink-0 px-2 pb-2 pt-4 mx-auto space-x-2">
      <img class="mx-auto block h-10 w-auto" src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg" alt="Sapling Data" />
    </div>
    <div class="flex-1 flex flex-col overflow-y-auto">
      <nav class="flex-1 px-2 pb-2 flex flex-col">
        <div class="mb-5">
          <CloudMenu appTitle={appTitle} navMode={"sidebar"} />
        </div>
        <div>
          <Router>
            {#each navItems as item}
              <Link
                      to={basePath + item.href}
                      class="inline-block text-white flex items-center px-2 py-1.5 text-xxs rounded-md"
              >
                {#if item.icon}
                  <Icon src={item.icon} theme="outline" class="text-blue-500 block h-4 w-4 mr-2" />
                {/if}
                {item.name}
              </Link>
            {/each}
          </Router>
        </div>
        <UserMenu navMode={"sidebar"} />
      </nav>
    </div>
  </div>
</div>
