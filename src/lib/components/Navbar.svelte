<script lang="ts">
import { onMount } from 'svelte';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@rgossiaux/svelte-headlessui';
import { Link, Router } from 'svelte-routing';
import CloudMenu from './menus/CloudMenu.svelte';
import UserMenu from './menus/UserMenu.svelte';
import { Icon } from '@steeze-ui/svelte-icon';
import type { IconThemeSource } from '@steeze-ui/svelte-icon';
import {Briefcase, ChevronDown, Logout, User, X} from '@steeze-ui/heroicons'
import { Menu as MenuIcon } from '@steeze-ui/heroicons'
export let basePath: string;
export let navItems: ({ name: string; icon: { default: IconThemeSource } & { [p: string]: IconThemeSource }; href: string })[];
export let appTitle: string;
</script>

<Disclosure as="nav" class="bg-gray-800" id="navbar" let:open>
  <div class="px-2 mx-auto sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-12">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <DisclosureButton class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <span class="sr-only">Open main menu</span>
          {#if open}
            <Icon src={X} theme="outline" class="block w-6 h-6" aria-hidden="true" />
          {:else}
            <Icon src={MenuIcon} theme="outline" class="block w-6 h-6" aria-hidden="true" />
          {/if}
        </DisclosureButton>
      </div>
      <div class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center mr-4">
          <img class="block lg:hidden h-8 w-auto" src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg" alt="Sapling Data" />
          <img class="hidden lg:block h-8 w-auto" src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg" alt="Sapling Data" />
        </div>
        <CloudMenu appTitle={appTitle} navMode={"navbar"}  />
        <div class="hidden sm:flex sm:ml-6">
          <div class="flex items-center space-x-2">
            <Router>
              {#each navItems as item}
                <Link
                        to={basePath + item.href}
                        class="my-auto text-white flex items-center px-2 py-1.5 text-xxs rounded-md"
                >
                  {#if item.icon}
                    <Icon src={item.icon} theme="outline" class="text-blue-500 block h-4 w-4 mr-2" />
                  {/if}
                  {item.name}
                </Link>
              {/each}
            </Router>
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 z-50 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
        <UserMenu navMode={"navbar"} />
      </div>
    </div>
  </div>

  <DisclosurePanel class="sm:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1">
      {#each navItems as item}
        <Link
            to={basePath + item.to}
            class="my-auto text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          {item.name}
        </Link>
      {/each}
    </div>
  </DisclosurePanel>
</Disclosure>

<style>
    a[aria-current="page"] {
        @apply bg-gray-900;
    }
</style>
