<script lang="ts">
  import {Icon} from "@steeze-ui/svelte-icon";
  import {Exclamation, XCircle} from "@steeze-ui/heroicons";

  export let message: string;
</script>

<span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium dark:text-red-400 text-red-700">
  <Icon src={Exclamation} theme="solid" class="-ml-1 mr-2 h-4 w-4 dark:text-red-400 text-red-500" />
  <span>{message}</span>
</span>
