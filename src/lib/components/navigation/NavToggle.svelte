<script lang="ts">
  import {Icon} from "@steeze-ui/svelte-icon";
  import {X} from "@steeze-ui/heroicons";
  import {SidebarCollapse, SidebarExpand} from "@steeze-ui/octicons";

  export let show: boolean;
  export let minimal: boolean;
</script>

<div class="flex flex-col gap-2">
  <button
          on:click={() => minimal = !minimal}
          type="button"
          class="my-auto text-gray-400 flex items-center px-2 py-1.5 text-xxs
                      rounded-md hover:bg-gray-700 hover:text-white gap-1"
  >
    <Icon src={minimal ? SidebarExpand : SidebarCollapse}  class="{ minimal ? 'h-4 w-4' : 'h-3 w-3' } rotate-180" />
    <span class="{ minimal && 'hidden' } my-auto">Minimize sidebar</span>
  </button>
  <button
          on:click={() => show = !show}
          type="button"
          class="my-auto text-gray-400 flex items-center px-2 py-1.5 text-xxs
                      rounded-md hover:bg-gray-700 hover:text-white gap-2"
  >
    <Icon src={X} theme="solid" class="{ minimal ? 'h-4 w-4' : 'h-3 w-3' }" />
    <span class="{ minimal && 'hidden' } my-auto">Close sidebar</span>
  </button>
</div>
