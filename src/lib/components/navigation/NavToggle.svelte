<script lang="ts">
  import {Icon} from "@steeze-ui/svelte-icon";
  import {X} from "@steeze-ui/heroicons";
  import {SidebarCollapse, SidebarExpand} from "@steeze-ui/octicons";

  export let show: boolean;
  export let minimal: boolean;
  export let allowClose: boolean;
</script>

<div class="flex flex-col gap-2">
  <button
          on:click={() => minimal = !minimal}
          type="button"
          class="my-auto text-gray-600 hover:text-gray-600 hover:bg-gray-200 dark:text-gray-400 flex items-center px-2 py-1.5 text-xxs
                      rounded-md dark:hover:bg-gray-800 dark:hover:text-white gap-1"
  >
    <Icon src={minimal ? SidebarExpand : SidebarCollapse}  class=" h-3 w-3 { minimal && 'ml-0.5 my-0.5' } rotate-180" />
    <span class="{ minimal && 'hidden' } ml-2 my-auto">Minimize sidebar</span>
  </button>
  {#if allowClose}
    <button
            on:click={() => show = !show}
            type="button"
            class="my-auto text-gray-600 hover:text-gray-600 hover:bg-gray-200 dark:text-gray-400 flex items-center px-2 py-1.5 text-xxs
                        rounded-md dark:hover:bg-gray-800 dark:hover:text-white gap-2"
    >
      <Icon src={X} theme="solid" class="h-3 w-3 { minimal && 'ml-0.5 my-0.5' }" />
      <span class="{ minimal && 'hidden' } ml-1 my-auto">Close sidebar</span>
    </button>
  {/if}
</div>
