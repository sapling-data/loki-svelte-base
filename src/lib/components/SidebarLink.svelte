<script lang="ts">
  export let label: string;
  export let href: string;
  export let currentRoute: string;
  import { Link, Router } from 'svelte-routing';
</script>

<Link {href}
   class="text-gray-600 flex items-center px-1 py-1 text-xxs rounded-md"
>
  <slot name="icon" />
  {label}
</Link>
