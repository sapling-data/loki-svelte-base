<script lang="ts">
  import { useQuery } from '@sveltestack/svelte-query';
  import { fetchWorkflow } from '../queries';
  import LoadingIndicator from "../components/LoadingIndicator.svelte";
  export let workflowId: string;
  export let location;
  const workflow = useQuery('workflow', () => fetchWorkflow(workflowId));
</script>

<div class="relative">
  {#if $workflow.isLoading}
    <div class="absolute top-0 right-0">
      <LoadingIndicator mode="load" itemName="workflow" />
    </div>
  {:else if $workflow.error}
    <div class="absolute top-0 right-0">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800">
        <span>Error: {$workflow.error.message}</span>
      </span>
    </div>
  {:else}
    <div class="flex w-full relative">
      <h1 class="text-lg font-bold">{$workflow.data.name}</h1>
      {#if $workflow.isFetching}
        <div class="ml-auto my-auto">
          <LoadingIndicator mode="fetch" itemName="workflow" />
        </div>
      {/if}
    </div>
    <div class="text-sm">
      <span class="font-bold">Description:</span>
      <span>{$workflow.data.description}</span>
    </div>
    {#each $workflow.data.steps as step}
      <div class="text-sm">
        <span class="font-bold">Step:</span>
        <span>{step.name}</span>
      </div>
    {/each}
  {/if}
</div>


