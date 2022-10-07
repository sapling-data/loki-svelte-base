<script lang="ts">
  import { Router } from 'svelte-routing';
  import CloudMenu from '../menus/CloudMenu.svelte';
  import type { IconThemeSource } from '@steeze-ui/svelte-icon';
  import UserMenu from "../menus/UserMenu.svelte";
  import NavLink from "./NavLink.svelte";
  import NavToggle from "./NavToggle.svelte";
  import Logo from "./Logo.svelte";
  export let navItems: ({ name: string; icon: { default: IconThemeSource } & { [p: string]: IconThemeSource }; href: string })[];
  export let title: string;
  export let show: boolean = false;
  export let allowNavToggle: boolean;
  export let allowNavClose: boolean;
  export let displayCloudMenu: boolean;
  export let displayUserMenu: boolean;
  export let displayLogo: boolean;
  export let minimal: boolean;
</script>

{#if show}
  <div
          class="bg-gray-100 dark:bg-gray-900 border-r-[1px] border-gray-300 dark:border-gray-800 flex flex-col pb-2" id="sidebar"
  >
    <div class="flex flex-col h-0 flex-1 pt-2 {minimal ? 'w-12' : 'w-56 min-w-max'}">
      {#if displayLogo}
        <div class="{minimal && 'hidden'} flex items-center flex-shrink-0 px-2 pb-2 mx-auto">
          <Logo height="50px" width="200px" />
        </div>
      {/if}
      <div class="flex-1 flex flex-col overflow-y-auto">
        <nav class="flex-1 px-2 pb-2 flex flex-col">
          <div class="mb-5">
            <CloudMenu
                    {displayCloudMenu}
                    {title}
                    {minimal}
            />
          </div>
          <div>
            <Router>
              {#each navItems as item}
                {#if !item.hasOwnProperty('guard')}
                  <NavLink
                          to={item.to}
                          icon={item.icon}
                          name={item.name}
                          {minimal}
                  />
                {:else if item.guard()}
                  <NavLink
                          to={item.to}
                          icon={item.icon}
                          name={item.name}
                          {minimal}
                  />
                {/if}
              {/each}
            </Router>
          </div>
          <div class="mt-auto flex flex-col space-y-3">
            {#if allowNavToggle}
              <NavToggle
                      bind:show={show}
                      bind:minimal={minimal}
                      bind:allowClose={allowNavClose}
              />
            {/if}
            {#if displayUserMenu}
              <UserMenu
                      bind:minimal={minimal}
                      navMode={"sidebar"}
                      thinNavbar={false}
              />
            {/if}
          </div>
        </nav>
      </div>
    </div>
  </div>
{/if}
