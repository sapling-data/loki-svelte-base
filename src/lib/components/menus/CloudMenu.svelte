<script lang="ts">
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from '@rgossiaux/svelte-headlessui';
  import { createPopperActions } from 'svelte-popperjs';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ChevronDown, GlobeAlt, MenuAlt2 } from '@steeze-ui/heroicons';
  import { loadMenu } from '../../helpers';
  import type { CloudMenuItem } from '../../types';
  const [popperRef] = createPopperActions();
  const menuItems: CloudMenuItem[] = loadMenu();
  export let title: string;
  export let displayCloudMenu: boolean;
  export let thinNavbar: boolean = false;
  export let navMode: string = 'sidebar';
  export let minimal: boolean;
</script>

{#if displayCloudMenu}
  <Popover class="{navMode === 'navbar' && !thinNavbar ? 'py-2' : ''} flex flex-col" let:open>
    <PopoverButton
            use={[popperRef]}
            class="group w-full px-2 {navMode === 'navbar' && !thinNavbar && 'py-2'} my-auto text-sm text-left font-medium"
    >
      <div class="flex w-full justify-between items-center">
        <span class="flex min-w-0 items-center justify-between space-x-2">
          <span class="flex-1 flex flex-col min-w-0">
            {#if !minimal}
              <span
                      class="text-sm font-medium truncate dark:group-hover:text-blue-300 group-hover:text-blue-600
                      {open ? 'dark:text-blue-300 text-blue-600' : 'dark:text-white text-gray-600'}"
              >
                {title}
              </span>
            {/if}
          </span>
        </span>
        {#if !minimal}
          <div
                  class="dark:group-hover:text-blue-300 group-hover:text-blue-600
                  {open ? 'dark:text-blue-300 text-blue-600' : 'dark:text-gray-400 text-gray-600'}"
          >
            <Icon
                    src={ChevronDown}
                    class="flex-shrink-0 h-4 w-4 ml-2"
                    aria-hidden="true" />
          </div>
        {:else}
          <div>
            <Icon
                    src={MenuAlt2}
                    theme="outline"
                    class="-ml-0.5 h-5 w-5 hover:text-blue-600 dark:hover:text-blue-300 {open ? 'dark:text-blue-300 text-blue-600' : 'dark:text-white text-gray-600'}"
                    aria-hidden="true" />
          </div>
        {/if}
      </div>
    </PopoverButton>
    {#if open}
      <div
              class:z-50={open}
      >
        <PopoverPanel
                class="cloud-menu-container p-1.5 absolute max-h-96 overflow-y-auto
                origin-top-left bg-white dark:bg-gray-900 rounded-md shadow-lg ring-1 ring-black
                ring-opacity-5 focus:outline-none dark:border dark:border-gray-700 {thinNavbar && '-mt-0.5'}"
        >
          {#each menuItems as item }
            <a
                    href={item.link}
                    class="flex flex-row w-full items-center px-2 py-1.5
                    text-xxs hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white rounded-md
                    text-gray-700 whitespace-nowrap">
              <Icon
                      src={GlobeAlt}
                      theme="outline"
                      class="block h-4 w-4 mr-2 text-blue-500"
              />
              <span class="my-auto text-xxs">{ item.title }</span>
            </a>
          {/each}
        </PopoverPanel>
      </div>
    {/if}
  </Popover>
{:else if !minimal}
  <div class="{navMode === 'navbar' && !thinNavbar ? 'py-2' : ''} flex flex-col">
    <div class="w-full px-2 {navMode === 'navbar' && !thinNavbar && 'py-2'} my-auto text-sm text-left font-medium">
      <div class="flex w-full justify-between items-center">
      <span class="flex min-w-0 items-center justify-between space-x-2">
        <span class="flex-1 flex flex-col min-w-0">
          <span
                  class="text-sm font-medium truncate dark:text-white text-gray-600"
          >
            {title}
          </span>
        </span>
      </span>
      </div>
    </div>
  </div>
{/if}

<style>
    div :global(.cloud-menu-container) {
        z-index: 9000 !important;
    }
</style>
