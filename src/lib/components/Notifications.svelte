<script>
  import { notifications } from '../notifications';
  import Toast from "./Toast.svelte";
</script>

<div class="notifications">
  {#each $notifications as notification (notification.id)}
    <Toast
            type={notification.type}
            message={notification.message}
            id={notification.id}
            dismissable={notification.dismissable}
       />
  {/each}
</div>
