<script>
  import { notifications } from '../notifications';
  import Toast from "./Toast.svelte";
</script>

<div class="notifications gap-3">
  {#each $notifications as notification (notification.id)}
    <Toast
            title={notification.title}
            type={notification.type}
            message={notification.message}
            id={notification.id}
            dismissable={notification.dismissable}
       />
  {/each}
</div>
