<script lang="ts">
  import {
    Popover,
    PopoverButton,
    PopoverPanel
  } from '@rgossiaux/svelte-headlessui';
  import { createPopperActions } from 'svelte-popperjs';
  import { Briefcase, ChevronDown, Logout, User } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
  const [popperRef] = createPopperActions();
  export let navMode: string;
  export let minimal: boolean;
  export let thinNavbar: boolean;
  let userData = import.meta.env.MODE === 'development' ? {
    urn: 'urn:com:saplingdata:domain:security:users:testUser',
    name: 'Test User'
  } : loki.user?.getUserData();

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
  const menuItems = [
    {
      title: 'Profile',
      icon: User,
      href: '/'
    },
    {
      title: 'System Info',
      icon: Briefcase,
      href: '/'
    },
    {
      title: 'Logout',
      icon: Logout,
      href: '/'
    }
  ]
</script>

<Popover class="{!minimal && 'px-2'} {navMode === 'navbar' && !thinNavbar ? 'py-2' : ''} flex flex-col w-full" let:open>
  <PopoverButton
          use={[popperRef]}
          class="group w-full text-sm text-left font-medium"
  >
    <div class="flex w-full justify-between items-center my-auto">
      <div class="flex min-w-0 items-center {!minimal && 'justify-between space-x-2'}">
        {#if !thinNavbar}
          <div class="flex-1 flex flex-col min-w-0">
            <div
                    class="{minimal && 'mx-auto'} w-8 h-8 bg-blue-600 group-hover:bg-blue-700 flex
                    flex-col rounded-full items-center {open ? 'dark:text-blue-300 bg-blue-700 text-blue-600' : 'dark:text-white text-gray-600'}"
            >
                <span class="my-auto text-sm font-semibold text-white">
                  {getInitials(userData.name)}
                </span>
            </div>
          </div>
        {/if}
        {#if !minimal}
          <div class="flex-shrink-0 flex flex-col min-w-0">
              <span
                      class="text-xxs font-medium truncate group-hover:text-blue-600 dark:group-hover:text-blue-300
                      {open ? 'dark:text-blue-300 text-blue-600' : 'dark:text-white text-gray-600'}"
              >
                {userData.name}
              </span>
          </div>
        {/if}
      </div>
      {#if !minimal}
        <div
                class="ml-auto dark:group-hover:text-blue-300 group-hover:text-blue-600 {open ? 'dark:text-blue-300 text-blue-600' : 'dark:text-gray-400 text-gray-600'}"
        >
          <Icon
                  src={ChevronDown}
                  class="flex-shrink-0 h-4 w-4 ml-2 {navMode === 'sidebar' && 'rotate-180'}"
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
              class="menu-container p-1.5 absolute max-h-96 w-48 overflow-y-auto
                origin-bottom-left bg-white dark:bg-gray-900 rounded-md shadow-lg ring-1 ring-black
                ring-opacity-5 focus:outline-none dark:border dark:border-gray-700
                {navMode === 'sidebar' ? '-translate-y-full -bottom-12' : thinNavbar ? 'top-7 right-1' : 'top-11 right-1'}"
      >
        {#each menuItems as item }
          <button
                  href={item.link}
                  class="flex flex-row w-full items-center px-2 py-1.5
                    text-xxs hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white rounded-md
                    text-gray-700 whitespace-nowrap">
            <Icon
                    src={item.icon}
                    theme="outline"
                    class="block h-4 w-4 mr-2 text-blue-500"
            />
            <span class="my-auto text-xxs">{ item.title }</span>
          </button>
        {/each}
      </PopoverPanel>
    </div>
  {/if}
</Popover>

<style>
    div :global(.menu-container) {
        z-index: 9000 !important;
    }
</style>
