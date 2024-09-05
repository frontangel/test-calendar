<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import listPlugin from '@fullcalendar/list'
  import bootstrap5Plugin from '@fullcalendar/bootstrap5'
  import EventForm from '~/components/my-calendar-form.vue';
  import { onClickOutside } from '@vueuse/core'
  import { useCalendarUtil } from '~/utils/calendar.util.ts';

  const calendarView = defineModel('view')
  const props = withDefaults(defineProps<{
    events: any[]
  }>(), {
    events: () => []
  })
  const emits = defineEmits(['update', 'add', 'delete'])

  const { mapEvent } = useCalendarUtil()
  const calendarEvents = computed(() => props.events.map(mapEvent))

  const cleanForm = {
    id: null,
    title: '',
    date: '',
    time: '',
    notes: '',
    color: '',
  }
  const calendarRef = ref()
  const tooltipRef = ref()
  const showForm = ref(false)
  const eventModel = reactive({ ...cleanForm })
  const tooltipPosition = ref({ top: '0px', left: '0px' })

  onClickOutside(tooltipRef, clearForm)

  const mapGridView = new Map([
    ['dayGridMonth', 'listMonth'],
    ['timeGridWeek', 'listWeek'],
    ['timeGridDay', 'listDay'],
  ])

  const calendarOptions = reactive({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, bootstrap5Plugin],
    initialView: calendarView,
    themeSystem: 'bootstrap5',
    editable: true,
    droppable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    contentHeight: 800,
    headerToolbar: {
      start: 'today,prev,next',
      center: 'title',
      end: '',
    },
    buttonText: {
      today: 'Today',
      prev: 'Back',
      next: 'Next',
      month: 'Month',
      week: 'Week',
      day: 'Day',
    },
    customButtons: {
      agendaCustom: {
        text: 'Agenda',
        click: toggleAgendaView
      },
    },
    views: {
      dayGridMonth: {
        titleFormat: { month: 'long', year: 'numeric' },
      },
      timeGridWeek: {
        titleFormat: { month: 'short',  day: 'numeric' },
      },
      timeGridDay: {
        titleFormat: { week: 'long', month: 'short', day: 'numeric' },
      }
    },
    events: calendarEvents,
    fixedWeekCount: false,
    displayEventTime: false,
    eventDisplay: 'block',
    slotDuration: '01:00:00',
    slotLabelInterval: '02:00',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    },
    aspectRatio: 1.1,
    select: handleDateSelect,
    eventClick: handleEventClick,
    eventChange: handleEventChange,
    datesSet: info => {
      calendarView.value = info.view.type
    }
  })

  function handleDateSelect (info) {
    const { date } = getDateObj(info.startStr)
    Object.assign(eventModel, { ...cleanForm, date, time: '12:00', allDay: info.allDay })
    showTooltip(info.jsEvent)
  }

  function showTooltip (event: MouseEvent) {
    const element = event.target
    const rect = element.getBoundingClientRect()
    tooltipPosition.value = {
      top: `${event.clientY - event.offsetY + rect.height * 0.8}px`,
      left: `${event.clientX - event.offsetX + rect.width * 0.5}px`,
    }
    showForm.value = true
  }

  function handleEventClick (info) {
    const event = props.events.find(event => event.id === info.event.id)
    Object.assign(eventModel, event)
    showTooltip(info.jsEvent)
  }

  function handleEventChange (info) {
    const { id, startStr, allDay } = info.event
    const { date, time } = getDateObj(startStr)
    emits('update', { id, date, time, allDay })
    clearForm()
  }

  function getDateObj (startStr) {
    const dateObject = new Date(startStr);
    const date = dateObject.toISOString().split('T')[0];
    const time = dateObject.toTimeString().split(' ')[0].slice(0, 5);
    return { date, time }
  }

  function toggleAgendaView () {
    const calendarApi = calendarRef.value?.getApi()
    const prevView = calendarApi.view.type
    const nextView = getNextView(prevView)
    nextView && calendarApi.changeView(nextView)
  }

  function changeView (view) {
    const calendarApi = calendarRef.value?.getApi()
    calendarApi.changeView(view);
  }

  function getNextView (view: string) {
    const findByValue = (value) => {
      for (const [k, v] of mapGridView.entries()) {
        if (v === value) return k;
      }
      return undefined
    }
    return mapGridView.get(view) || findByValue(view)
  }

  function submitEvent(payload) {
    payload.id
      ? emits('update', payload)
      : emits('add', payload)
    updateCalendarEvents()
    clearForm()
  }

  function updateCalendarEvents() {
    const calendarApi = calendarRef.value.getApi()
    calendarApi.removeAllEvents()
    calendarApi.addEventSource(calendarEvents)
  }

  function clearForm() {
    Object.assign(eventModel, cleanForm)
    showForm.value = false
  }

  function discard(id) {
    emits('delete', id)
    updateCalendarEvents()
    clearForm()
  }
</script>

<template>
  <div class="my-calendar">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h3 class="card-title">Calendar View</h3>
      <div class="fc-toolbar-chunk">
        <div class="btn-group">
          <button class="btn btn-primary" :class="{ active: calendarView === 'dayGridMonth' }" @click="changeView('dayGridMonth')">Month</button>
          <button class="btn btn-primary" :class="{ active: calendarView === 'timeGridWeek' }" @click="changeView('timeGridWeek')">Week</button>
          <button class="btn btn-primary" :class="{ active: calendarView === 'timeGridDay' }" @click="changeView('timeGridDay')">Day</button>
          <button class="btn btn-primary" :class="{ active: ['listMonth', 'listWeek', 'listDay', ''].includes(calendarView) }" @click="toggleAgendaView">Agenda</button>
        </div>
      </div>
    </div>
    <FullCalendar ref="calendarRef" :options="calendarOptions" />
    <div v-if="showForm" ref="tooltipRef" class="my-tooltip" :style="tooltipPosition">
      <button class="close-button" @click="clearForm">
        <i class="bi bi-x-circle" />
      </button>
      <event-form
        :form="eventModel"
        @submit="submitEvent"
        @close="clearForm"
        @discard="discard"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .card-title {
    font-size: 18px;
    font-weight: 300;
  }
  .my-calendar {
    text-align: left;
  }
  .my-tooltip {
    z-index: 1080;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-50%);
    background-color: #FFFFFF;
    border: 1px solid #43425D;
    border-radius: 10px;
    box-shadow: 0 3px 18px #00000029;;
    width: 200px;
    padding: calc(25px - 0.5rem) calc(25px - 0.5rem);
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -100%);
      border-bottom: 9px solid #43425D;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }
    .close-button {
      height: 30px;
      width: 30px;
      border: 0;
      background-color: transparent;
      margin: 0;
      padding: 0;
      position: absolute;
      right: 0;
      top: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 20px;
      color: #D6D6D6;
      i {}
    }
  }
</style>
