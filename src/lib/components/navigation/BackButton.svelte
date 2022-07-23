<script lang="ts">
  import {Icon} from "@steeze-ui/svelte-icon";
  import {ArrowLeft} from "@steeze-ui/heroicons";

  function goBack() {
    window.history.back();
  }
</script>

<button
        on:click={goBack}
        type="button"
        class="inline-flex items-center -ml-2.5 px-2.5 py-1.5 text-xs rounded dark:text-gray-400
        dark:hover:bg-gray-800 dark:hover:text-white text-gray-700 hover:bg-blue-100
        hover:text-blue-500 focus:outline-none">
        <Icon src={ArrowLeft} theme="solid" class="h-4 w-4 mr-2" />
        <span class="my-auto">Back</span>
</button>
