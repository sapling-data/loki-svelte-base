<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import {
      Popover,
      PopoverButton,
      PopoverPanel,
  } from '@rgossiaux/svelte-headlessui';
  import { createPopperActions } from 'svelte-popperjs';
  import { Icon } from '@steeze-ui/svelte-icon';
  import {ChevronDown, Cube, GlobeAlt} from '@steeze-ui/heroicons';
  import { loadMenu } from '../../helpers';
  const [popperRef, popperContent] = createPopperActions();
  const popperOptions = {
      placement: "bottom-end",
      strategy: "fixed",
  };
  export let appTitle: string;
  let menuItems;
  onMount(async() => menuItems = loadMenu());
</script>

<Popover let:open>
  <PopoverButton
          use={[popperRef]}
          class="group w-full bg-gray-800 px-2 py-2 text-sm text-left font-medium"
  >
    <div class="flex w-full justify-between items-center">
      <span class="flex min-w-0 items-center justify-between space-x-2">
        <span class="flex-1 flex flex-col min-w-0">
          <span
                  class="text-sm font-medium truncate group-hover:text-blue-300 {open ? 'text-blue-300' : 'text-white'}"
          >
            {appTitle}
          </span>
        </span>
      </span>
      <div
              class="group-hover:text-blue-300"
              class:text-blue-300={open}
              class:text-gray-400={!open}
      >
        <Icon
                src={ChevronDown}
                class="flex-shrink-0 h-4 w-4 ml-2"
                aria-hidden="true" />
      </div>
    </div>
  </PopoverButton>
  {#if open}
    <div class:z-50={open} out:fade="{{ duration: 125 }}">
      <PopoverPanel class="ml-2 cloud-menu-container p-1.5 absolute max-h-96 overflow-y-auto origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {#each menuItems as item }
          <a
                  href={item.link}
                  class="text-white flex flex-row w-full items-center px-2 py-1.5
                text-xxs hover:bg-gray-200 rounded-md
                text-gray-700 whitespace-nowrap">
            <Icon src={GlobeAlt} theme="outline" class="block h-4 w-4 mr-2 text-blue-500" />
            <span class="my-auto text-xxs">{ item.title }</span>
          </a>
        {/each}
      </PopoverPanel>
    </div>
  {/if}
</Popover>

<style>
    div :global(.cloud-menu-container) {
        z-index: 9000 !important;
    }
</style>
