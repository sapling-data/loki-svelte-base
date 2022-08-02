<script lang="ts">
  import { appConfig } from '../config';
  import { useQuery } from '@sveltestack/svelte-query';
  import { fetchWorkflows } from '../queries';
  import { Link } from 'svelte-routing';
  import LoadingIndicator from '../components/LoadingIndicator.svelte';
  import { notifications } from '../notifications';
  import ErrorIndicator from "../components/ErrorIndicator.svelte";
  const workflows = useQuery(
    'workflows',
    () => fetchWorkflows(),
    {
      onError: (error) => {
        notifications.error(error.message, error.error);
      }
    }
  );
  const { basePath } = appConfig;
</script>

<div class="relative p-4 dark:text-white">
  {#if $workflows.isLoading}
    <div class="top-0 left-0">
      <LoadingIndicator mode="load" itemName="workflows" />
    </div>
  {:else if $workflows.error}
    <div class="top-0 left-0">
      <ErrorIndicator message={$workflows.error.message} />
    </div>
  {:else}
    <div class="flex w-full">
      <h1 class="text-lg font-bold">Workflows</h1>
      {#if $workflows.isFetching}
        <div class="ml-3 my-auto">
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
