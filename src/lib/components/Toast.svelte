<script lang="ts">
  import { fly } from 'svelte/transition';
  import {CheckCircle, InformationCircle, XCircle, Exclamation, X} from "@steeze-ui/heroicons";
  import {Icon} from "@steeze-ui/svelte-icon";
  import type {IconSource} from "@steeze-ui/svelte-icon";
  import {notifications} from "../notifications";

  export let type: string;
  export let message: string;
  export let title: string;
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
  const icon: IconSource = getIcon(type);
</script>

<div
        transition:fly={{ x: 100 }}
        aria-live="assertive"
        class="w-80 inset-0 flex items-end pointer-events-none sm:items-start">
  <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
    <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <Icon src={icon} theme="solid" class="h-6 w-6 {iconColor}" />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">{title}</p>
            <p class="mt-1 text-sm text-gray-500">{message}</p>
          </div>
          {#if dismissable}
            <div class="ml-4 flex-shrink-0 flex">
              <button
                      on:click={() => notifications.dismiss(id)}
                      type="button"
                      class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline">
                <span class="sr-only">Close</span>
                <Icon src={X} theme="solid" class="h-5 w-5" />
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
