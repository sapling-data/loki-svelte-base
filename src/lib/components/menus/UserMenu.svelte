<script lang="ts">
  import { fade } from 'svelte/transition';
  import {Menu, MenuButton, MenuItem, MenuItems} from "@rgossiaux/svelte-headlessui";
  import {Briefcase, ChevronDown, ChevronUp, Logout, User} from "@steeze-ui/heroicons";
  import {Icon} from "@steeze-ui/svelte-icon";
  export let navMode: string;
  let userData = loki.user?.getUserData() || {
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

<Menu as="div" class="mt-auto relative inline-block text-left" let:open>
  <div>
    <MenuButton class="group w-full bg-gray-800 px-2 py-2 text-sm text-left font-medium">
      <div class="flex w-full justify-between items-center">
        <div class="flex min-w-0 items-center justify-between space-x-2">
          <div
                  class="w-8 h-8 bg-blue-500 group-hover:bg-blue-600 flex flex-col rounded-full items-center"
                  class:bg-blue-600={open}
                  class:bg-blue-500={!open}
          >
            <span class="my-auto text-sm font-semibold text-white">
              {getInitials(userData.name)}
            </span>
          </div>
          <span class="flex-1 flex flex-col min-w-0">
            <span
                    class="text-xxs font-medium truncate group-hover:text-blue-300"
                    class:text-blue-300={open}
                    class:text-white={!open}
            >
              {userData.name}
            </span>
          </span>
        </div>
        <div
                class="group-hover:text-blue-300"
                class:text-blue-300={open}
                class:text-gray-400={!open}
        >
          <Icon src={navMode === 'sidebar' ? ChevronUp : ChevronDown} class="ml-4 flex-shrink-0 h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </MenuButton>
  </div>
  {#if open}
    <div out:fade="{{ duration: 125 }}">
      <MenuItems
              class="z-10 p-1.5 transform absolute right-0 left-0 bg-white rounded-md
              shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
              {navMode === 'sidebar' ? 'origin-top-right -translate-y-full -top-2' : 'mt-[-0.25rem]'}"
      >
        <div>
          <MenuItem class="flex flex-row">
            <button
                    class="text-white flex w-full items-center px-2 py-1.5
                    text-xxs hover:bg-gray-200 rounded-md
                    text-gray-700 whitespace-nowrap">
              <Icon
                      src={User}
                      theme="outline"
                      class="block h-4 w-4 mr-2"
              />
              <span class="my-auto text-xxs">Profile</span>
            </button>
          </MenuItem>
          <MenuItem class="flex flex-row">
            <button
                    class="text-white flex w-full items-center px-2 py-1.5
                    text-xxs hover:bg-gray-200 rounded-md
                    text-gray-700 whitespace-nowrap">
              <Icon
                      src={Briefcase}
                      theme="outline"
                      class="block h-4 w-4 mr-2"
              />
              <span class="my-auto text-xxs">Account</span>
            </button>
          </MenuItem>
          <MenuItem class="flex flex-row">
            <button
                    class="text-white flex w-full items-center px-2 py-1.5
                    text-xxs hover:bg-gray-200 rounded-md
                    text-gray-700 whitespace-nowrap">
              <Icon
                      src={Logout}
                      theme="outline"
                      class="block h-4 w-4 mr-2"
              />
              <span class="my-auto text-xxs">Log out</span>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </div>
  {/if}
</Menu>
