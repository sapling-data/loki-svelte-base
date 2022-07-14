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
import CloudMenu from './CloudMenu.svelte';
import { Icon } from '@steeze-ui/svelte-icon';
import type { IconThemeSource } from '@steeze-ui/svelte-icon';
import {Briefcase, ChevronDown, Logout, User, X} from '@steeze-ui/heroicons'
import { Menu as MenuIcon } from '@steeze-ui/heroicons'
import { Cog } from '@steeze-ui/heroicons'
export let basepath: string = '';

const logout = async () => {
  await loki.user.logout();
  document.location.reload();
};
export let navItems: ({ name: string; icon: { default: IconThemeSource } & { [p: string]: IconThemeSource }; href: string })[];
let url: string = '';
export let userData = loki.user?.getUserData() || {
    urn: 'urn:com:saplingdata:domain:security:users:testUser',
    name: 'Test User'
};
const getInitials = (name) => {
    const parts = name.split(' ')
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0]
        }
    }
    return initials
}
onMount(() => url = window.location.href);
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
        <CloudMenu />
        <div class="flex-shrink-0 flex items-center">
          <img class="block lg:hidden h-8 w-auto" src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg" alt="Sapling Data" />
          <img class="hidden lg:block h-8 w-auto" src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg" alt="Sapling Data" />
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex items-center space-x-4">
            <Router>
              {#each navItems as item}
                <Link
                        to={basepath + item.href}
                        class="inline-block text-white flex items-center px-2 py-1.5 text-xxs rounded-md"
                >
                  <Icon src={item.icon} theme="outline" class="text-blue-500 block h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              {/each}
            </Router>
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 z-50 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton class="group w-full bg-gray-800 px-2 py-2 text-sm text-left font-medium">
              <span class="flex w-full justify-between items-center">
                <span class="flex min-w-0 items-center justify-between space-x-2">
                  <div class="w-8 h-8 bg-blue-500 group-hover:bg-blue-600 flex flex-col rounded-full items-center">
                    <span class="my-auto text-sm font-semibold text-white">
                      {getInitials(userData.name)}
                    </span>
                  </div>
                  <span class="flex-1 flex flex-col min-w-0">
                    <span class="text-xxs font-medium truncate text-gray-400 group-hover:text-gray-500">{userData.name}</span>
                  </span>
                </span>
                <Icon src={ChevronDown} class="flex-shrink-0 h-4 w-4 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              </span>
            </MenuButton>
          </div>
          <Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="z-10 mx-3 p-1.5 origin-top absolute right-0 left-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
              <div>
                <MenuItem class="flex flex-row">
                  <button
                          class="text-white flex w-full items-center px-2 py-1.5
                  text-xxs hover:bg-gray-200 rounded-md
                  text-gray-700 whitespace-nowrap">
                    <Icon src={User} theme="outline" class="block h-4 w-4 mr-2" />
                    <span class="my-auto text-xxs">Profile</span>
                  </button>
                </MenuItem>
                <MenuItem class="flex flex-row">
                  <button
                          class="text-white flex w-full items-center px-2 py-1.5
                  text-xxs hover:bg-gray-200 rounded-md
                  text-gray-700 whitespace-nowrap">
                    <Icon src={Briefcase} theme="outline" class="block h-4 w-4 mr-2" />
                    <span class="my-auto text-xxs">Account</span>
                  </button>
                </MenuItem>
                <MenuItem class="flex flex-row">
                  <button
                          class="text-white flex w-full items-center px-2 py-1.5
                  text-xxs hover:bg-gray-200 rounded-md
                  text-gray-700 whitespace-nowrap">
                    <Icon src={Logout} theme="outline" class="block h-4 w-4 mr-2" />
                    <span class="my-auto text-xxs">Log out</span>
                  </button>
                </MenuItem>

              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  </div>

  <DisclosurePanel class="sm:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1">
      {#each navItems as item}
        <Link
            to={basepath + item.to}
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
