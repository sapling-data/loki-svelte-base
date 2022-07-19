<script lang="ts">
  import { Router } from 'svelte-routing';
  import CloudMenu from '../menus/CloudMenu.svelte';
  import type { IconThemeSource } from '@steeze-ui/svelte-icon';
  import UserMenu from "../menus/UserMenu.svelte";
  import NavLink from "./NavLink.svelte";
  export let navItems: ({ name: string; icon: { default: IconThemeSource } & { [p: string]: IconThemeSource }; href: string })[];
  export let title: string;
  export let show = false;
  export let allowNavToggle: boolean;
</script>

{#if show}
  <div
          class="bg-gray-800 flex flex-col w-56" id="sidebar"
  >
    <div class="flex flex-col h-0 flex-1">
      <div class="flex items-center flex-shrink-0 px-2 pb-2 pt-4 mx-auto">
        <img
                class="block h-10 w-auto"
                src="https://saplingdata.com/wp-content/themes/sapling/img/sapling-data-logo.svg"
                alt="Sapling Data logo" />
      </div>
      <div class="flex-1 flex flex-col overflow-y-auto">
        <nav class="flex-1 px-2 pb-2 flex flex-col">
          <div class="mb-5">
            <CloudMenu
                    title={title}
            />
          </div>
          <div>
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
          <div class="mt-auto flex flex-col space-y-3">
            {#if allowNavToggle}
              <button
                      on:click={() => show = !show}
                      type="button"
                      class="my-auto text-gray-500 flex items-center px-2 py-1.5 text-xxs
                      rounded-md hover:bg-gray-700 hover:text-white"
              >
                <svg
                        class="h-4 w-4 mr-2"
                        stroke-width="1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 21L5 21C3.89543 21 3 20.1046 3 19L3 5C3 3.89543 3.89543 3 5 3L19 3C20.1046 3 21 3.89543 21 5L21 19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.25 10L5.5 12L7.25 14" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.5 21V3" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="mr-2">Close sidebar</span>
              </button>
            {/if}
            <UserMenu navMode={"sidebar"} />
          </div>
        </nav>
      </div>
    </div>
  </div>
{/if}
