<script lang="ts">
  import { Link } from 'svelte-routing';
  import type { IconSource } from '@steeze-ui/svelte-icon/types';
  import { Icon } from '@steeze-ui/svelte-icon';

  export let to: string;
  export let icon: IconSource;
  export let name: string;
  export let minimal: boolean;
  export let navMode: string = 'sidebar';
  export let thinNavbar: boolean = false;
</script>

<Link
        to={to}
        class="my-auto {navMode === 'navbar' && thinNavbar ? '' : 'rounded-md'} text-gray-600 dark:text-white flex items-center px-2 py-1.5 text-xxs"
>
  {#if icon}
    <Icon src={icon} theme="outline" class="text-blue-500 block h-4 w-4" />
  {/if}
  <span class="{ minimal && 'hidden' } ml-2 whitespace-nowrap">{name}</span>
</Link>
