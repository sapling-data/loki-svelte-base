<script lang="ts">
  import type { NavItem } from '../../types';
  import { Router } from 'svelte-routing';
  import CloudMenu from '../menus/CloudMenu.svelte';
  import UserMenu from '../menus/UserMenu.svelte';
  import NavLink from './NavLink.svelte';
  import Logo from './Logo.svelte';
  export let navItems: NavItem[];
  export let title: string;
  export let displayUserMenu: boolean;
  export let displayCloudMenu: boolean;
  export let displayLogo: boolean;
  export let thinNavbar: boolean;
</script>

<nav class="bg-gray-100 dark:bg-gray-900 border-b-[1px] dark:border-gray-800" id="navbar">
  <div class="pr-2 pl-4 mx-auto">
    <div class="relative flex items-center justify-between {!thinNavbar && 'h-12'}">
      <div class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
        {#if displayLogo && !thinNavbar}
          <div class="flex-shrink-0 flex items-center mr-4">
            <Logo height="50px" width="150px" />
          </div>
        {/if}
        <CloudMenu
                navMode={"navbar"}
                {thinNavbar}
                {displayCloudMenu}
                minimal={false}
                {title}
        />
        <div class="hidden sm:flex sm:ml-6">
          <div class="flex items-center space-x-2">
            <Router>
              {#each navItems as item}
                {#if !item.hasOwnProperty('guard')}
                  <NavLink
                          to={item.to}
                          icon={item.icon}
                          name={item.name}
                          {thinNavbar}
                          navMode="navbar"
                  />
                {:else if item.guard()}
                  <NavLink
                          to={item.to}
                          icon={item.icon}
                          name={item.name}
                          {thinNavbar}
                          navMode="navbar"
                  />
                {/if}
              {/each}
            </Router>
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 z-50 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
        {#if displayUserMenu}
          <UserMenu
                  navMode={"navbar"}
                  {thinNavbar}
          />
        {/if}
      </div>
    </div>
  </div>
</nav>

