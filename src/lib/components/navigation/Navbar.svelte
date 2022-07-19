<script lang="ts">
import type { NavItem } from '../../types';
import { Router } from 'svelte-routing';
import CloudMenu from '../menus/CloudMenu.svelte';
import UserMenu from '../menus/UserMenu.svelte';
import NavLink from './NavLink.svelte';
export let navItems: NavItem[];
export let title: string;
</script>

<nav class="bg-gray-800" id="navbar">
  <div class="pr-2 pl-4 mx-auto">
    <div class="relative flex items-center justify-between h-12">
      <div class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center mr-4">
          <img class="block lg:hidden h-8 w-auto" src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg" alt="Sapling Data" />
          <img class="hidden lg:block h-8 w-auto" src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg" alt="Sapling Data" />
        </div>
        <CloudMenu title={title} />
        <div class="hidden sm:flex sm:ml-6">
          <div class="flex items-center space-x-2">
            <Router>
              {#each navItems as item}
                <NavLink
                        to={item.to}
                        icon={item.icon}
                        name={item.name}
                />
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
</nav>

