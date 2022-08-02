<script lang="ts">
  import { useQuery } from '@sveltestack/svelte-query';
  import { fetchWorkflow } from '../queries';
  import LoadingIndicator from "../components/LoadingIndicator.svelte";
  import BackButton from "../components/navigation/BackButton.svelte";
  import ErrorIndicator from "../components/ErrorIndicator.svelte";
  import { notifications } from "../notifications";
  export let workflowId: string;
  const workflow = useQuery(
    'workflow',
    () => fetchWorkflow(workflowId),
    {
      onError: (error) => {
        notifications.error(error.message, error.error);
      }
    }
  );
</script>

<div class="relative p-4 dark:text-white">
  {#if $workflow.isLoading}
    <div class="top-0 left-0">
      <LoadingIndicator mode="load" itemName="workflow" />
    </div>
  {:else if $workflow.error}
    <div class="top-0 left-0">
      <ErrorIndicator message={$workflow.error.message} />
    </div>
  {:else}
    <BackButton />
    <div class="flex w-full mt-3">
      <h1 class="text-lg font-bold">{$workflow.data.name}</h1>
      {#if $workflow.isFetching}
        <div class="ml-3 my-auto">
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


