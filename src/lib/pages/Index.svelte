<script lang="ts">
  import { appConfig } from '../config';
  import { useQuery } from '@sveltestack/svelte-query';
  import { fetchWorkflows } from '../queries';
  import { Link } from 'svelte-routing';
  import LoadingIndicator from '../components/LoadingIndicator.svelte';
  import { notifications } from '../notifications';
  const workflows = useQuery(
    'workflows',
    () => fetchWorkflows(),
    {
      onError: (error) => {
        notifications.error(error);
      }
    }
  );
  const { basePath } = appConfig;
  export let location;
</script>

<div class="relative">
  {#if $workflows.isLoading}
    <div class="absolute top-0 right-0">
      <LoadingIndicator mode="load" itemName="workflows" />
    </div>
  {:else if $workflows.error}
    <div class="absolute top-0 right-0">
      <span class="inline-flex items-center px-3 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
        <span>Error: {$workflows.error.message}</span>
      </span>
    </div>
  {:else}
    <div class="flex w-full relative">
      <h1 class="text-lg font-bold">Workflows</h1>
      {#if $workflows.isFetching}
        <div class="absolute top-0 right-0">
          <LoadingIndicator mode="fetch" itemName="workflows" />
        </div>
      {/if}
    </div>
    <div>
      <ol>
        {#each $workflows.data as workflow}
          <div>{workflow.name}
            <strong class="ml-2">
              <Link to={`${basePath}/workflows/${loki.urn.getLastSegment(workflow.urn)}`}>
                View {workflow.urn}</Link>
            </strong>
          </div>
        {/each}
      </ol>
    </div>
  {/if}
</div>
