<script lang="ts">
  import { onMount } from 'svelte';
  import { Link, Router } from 'svelte-routing';
  import { Icon } from '@steeze-ui/svelte-icon';
  import CloudMenu from './CloudMenu.svelte';
  import type { IconThemeSource } from '@steeze-ui/svelte-icon';
  import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@rgossiaux/svelte-headlessui";
  import {Briefcase, ChevronDown, Cog, Logout, Selector, User} from "@steeze-ui/heroicons";
  export let navItems: ({ name: string; icon: { default: IconThemeSource } & { [p: string]: IconThemeSource }; href: string })[];
  export let basepath: string = '';
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
</script>

<div class="bg-gray-800 flex flex-col w-56" id="sidebar">
  <div class="flex flex-col h-0 flex-1">
    <div class="flex items-center flex-shrink-0 p-4">
      <CloudMenu />
      <img class="mx-auto block h-8 w-auto" src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg" alt="Sapling Data" />
    </div>
    <div class="flex-1 flex flex-col overflow-y-auto">
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
      <nav class="flex-1 px-2 py-4">
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
      </nav>
    </div>
  </div>
</div>
