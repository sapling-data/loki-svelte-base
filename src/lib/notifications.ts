import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

const DEFAULT_DURATION = 3000;

export type Notification = {
  id?: string,
  type?: string,
  title: string,
  message: string,
  duration: number,
  dismissable: boolean,
}

function createNotificationStore(duration: number = DEFAULT_DURATION) {
  const _notifications: Writable<Notification[]> = writable([]);

  function send(notification: Notification) {
    notification.id = getId();
    _notifications.update(state => {
      return [...state, notification];
    });
  }

  function dismiss(id: string) {
    _notifications.update(state => {
      return [...state.filter(notification => notification.id !== id)];
    });
  }

  const notifications = derived(_notifications, ($_notifications: Notification[], set) => {
    set($_notifications);
    if ($_notifications.length > 0) {
      const timer = setTimeout(() => {
        _notifications.update(state => {
          state.shift();
          return state;
        });
      }, $_notifications[0].duration);
      return () => {
        clearTimeout(timer);
      }
    }
  });

  const { subscribe } = notifications;

  return {
    subscribe,
    send,
    dismiss,
    default: (message: string, title: string, duration: number = DEFAULT_DURATION, dismissable: boolean = true) => send({title, message, type: 'default', duration, dismissable}),
    error: (message: string, title: string = 'Error', duration: number = DEFAULT_DURATION, dismissable: boolean = true) => send({title, message, type: 'error', duration, dismissable}),
    warning: (message: string, title: string = 'Warning', duration: number = DEFAULT_DURATION, dismissable: boolean = true) => send({title, message, type: 'warning', duration, dismissable}),
    info: (message: string, title: string = 'Information', duration: number = DEFAULT_DURATION, dismissable: boolean = true) => send({title, message, type: 'info', duration, dismissable}),
  };
}

function getId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export const notifications = createNotificationStore();
