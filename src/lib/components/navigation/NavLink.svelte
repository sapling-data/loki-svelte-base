<script lang="ts">
  import type {NavItem} from "../../types";
  import { Link } from 'svelte-routing';
  import { Icon } from '@steeze-ui/svelte-icon';
  export let to: string;
  export let icon: NavItem;
  export let name: string;
  export let minimal: boolean;
</script>

<Link
        to={to}
        class="my-auto text-white flex items-center px-2 py-1.5 text-xxs rounded-md"
>
  {#if icon}
    <Icon src={icon} theme="outline" class="text-blue-500 block h-4 w-4" />
  {/if}
  <span class="{ minimal && 'hidden' } ml-2 whitespace-nowrap">{name}</span>
</Link>
