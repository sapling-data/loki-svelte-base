import { writable, derived } from "svelte/store"
import type { Writable } from "svelte/store"

const DEFAULT_DURATION = 5000

type Notification = {
  id?: string,
  type?: string,
  message: string,
  duration: number,
  dismissable: boolean,
}

function createNotificationStore(duration: number = DEFAULT_DURATION) {
  const _notifications: Writable<Notification[]> = writable([])

  function send(notification: Notification) {
    notification.id = getId();
    _notifications.update(state => {
      return [...state, notification]
    })
  }

  function dismiss(id: string) {
    _notifications.update(state => {
      return [...state.filter(notification => notification.id !== id)];
    })
  }

  let timers = []

  const notifications = derived(_notifications, ($_notifications: Notification[], set) => {
    set($_notifications)
    if ($_notifications.length > 0) {
      const timer = setTimeout(() => {
        _notifications.update(state => {
          state.shift()
          return state
        })
      }, $_notifications[0].duration)
      return () => {
        clearTimeout(timer)
      }
    }
  })
  const { subscribe } = notifications

  return {
    subscribe,
    send,
    dismiss,
    default: (message: string, duration: number = DEFAULT_DURATION, dismissable: boolean = true) => send({message, type: 'default', duration, dismissable}),
    error: (message: string, duration: number = DEFAULT_DURATION, dismissable: boolean = true) => send({message, type: 'error', duration, dismissable}),
    warning: (message: string, duration: number = DEFAULT_DURATION, dismissable: boolean = true) => send({message, type: 'warning', duration, dismissable}),
    info: (message: string, duration: number = DEFAULT_DURATION, dismissable: boolean = true) => send({message, type: 'info', duration, dismissable}),
  }
}

function getId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export const notifications = createNotificationStore();
