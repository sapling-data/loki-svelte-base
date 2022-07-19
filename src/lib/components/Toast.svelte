<script lang="ts">
  import { fly } from 'svelte/transition';
  import {CheckCircle, InformationCircle, XCircle, Exclamation, X} from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import {notifications} from "../notifications";

  export let type: string;
  export let message: string;
  export let id: string;
  export let dismissable: boolean;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'error':
        return XCircle;
      case 'warning':
        return Exclamation;
      case 'info':
        return InformationCircle;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100';
      case 'error':
        return 'bg-red-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'info':
        return 'bg-blue-100';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
    }
  };

  const getButtonHoverColor = (type) => {
    switch (type) {
      case 'success':
        return 'hover:bg-green-200';
      case 'error':
        return 'hover:bg-red-200';
      case 'warning':
        return 'hover:bg-yellow-200';
      case 'info':
        return 'hover:bg-blue-200';
    }
  };

  const iconColor = getIconColor(type);
  const buttonHoverColor = getButtonHoverColor(type);
  const textColor = getTextColor(type);
  const backgroundColor = getBackgroundColor(type);
</script>

<div
        class="toast rounded-md {backgroundColor} p-4"
        transition:fly={{ x: 100 }}
>
  <div class="flex">
    <div class="flex-shrink-0">
      <Icon src={getIcon(type)} theme="solid" class="h-5 w-5 {iconColor}" />
    </div>
    <div class="ml-3">
      <p class="text-sm font-medium {textColor}">{message}</p>
    </div>
    {#if dismissable}
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
                  on:click={() => notifications.dismiss(id)}
                  type="button"
                  class="inline-flex {backgroundColor} rounded-md p-1.5 {iconColor} {buttonHoverColor}">
            <span class="sr-only">Dismiss</span>
            <Icon src={X} theme="solid" class="h-5 w-5" />
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
