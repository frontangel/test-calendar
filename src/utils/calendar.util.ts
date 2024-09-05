interface iEventDb {
  id?: string | null
  title: string
  date: string
  time: string
  color?: string
  note?: string
}

export function useCalendarUtil() {
  function mapEvent (event: iEventDb) {
    const { id, title, date, time, color, allDay } = event
    return {
      id,
      title,
      start: new Date(`${date}T${time}`),
      backgroundColor: color || '#3B86FF',
      borderColor: color || '#3B86FF',
      allDay: Boolean(allDay),
    }
  }

  return {
    mapEvent
  }
}
