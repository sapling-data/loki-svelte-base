<script>
  import { Route } from 'svelte-routing';
  import AccessDenied from "./AccessDenied.svelte";

  export let path;
  export let component;
  export let guard;

  $: isAuthorized = guard();
</script>

{#if isAuthorized}
  <Route path={path} component={component} />
{:else}
  <Route path={path} component={AccessDenied} />
{/if}
