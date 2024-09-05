<script setup lang="ts">
import { useCalendarStore } from '~/store/calendar.store.ts';
import { v4 as uuidv4 } from 'uuid';

const calendarStore = useCalendarStore()
const events = calendarStore.calendarDB

function onUpdate(payload) {
  calendarStore.updateEvent(payload)
}

function onAdd(payload) {
  calendarStore.addEvent({ ...payload, id: uuidv4() })
}

function onRemove(id) {
  calendarStore.deleteEvent(id)
}
</script>

<template>
  <my-calendar
    v-model:view="calendarStore.calendarView"
    :events="events"
    @update="onUpdate"
    @add="onAdd"
    @delete="onRemove"
  />
</template>
