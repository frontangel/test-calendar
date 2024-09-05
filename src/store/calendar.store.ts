import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useCalendarStore = defineStore('calendar', () => {
  const calendarDB: any[] = useLocalStorage<an[]>('calendarEvents', [])
  const calendarView: string = useLocalStorage<string>('calendarView', 'dayGridMonth')

  const addEvent = (event: any) => calendarDB.value.push(event)
  const updateEvent = (payload: any) => {
    const index = calendarDB.value.findIndex(event => event.id === payload.id);
    if (index > -1) {
      calendarDB.value[index] = { ...calendarDB.value[index], ...payload }
    }
  }
  const deleteEvent = (id) => {
    const index = calendarDB.value.findIndex(event => event.id === id);
    if (index > -1) {
      calendarDB.value.splice(index, 1);
    }
  }

  return {
    calendarDB,
    calendarView,
    addEvent,
    updateEvent,
    deleteEvent
  }
})
