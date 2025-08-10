<template>
  <div class="calendar-container">
    <div class="calendar-header d-flex align-center justify-space-between mb-6">
      <div>
        <h3 class="text-h5 font-weight-bold mb-2">Calendar</h3>
        <p class="text-body-2 text-medium-emphasis mb-0">
          Manage your schedule, interviews, and important dates
        </p>
      </div>
      <div class="d-flex gap-3">
        <v-btn
          color="primary"
          variant="outlined"
          prepend-icon="mdi-plus"
          @click="openAddEventDialog"
        >
          Add Event
        </v-btn>
        <v-btn
          variant="outlined"
          prepend-icon="mdi-calendar-sync"
          @click="syncCalendar"
        >
          Sync
        </v-btn>
      </div>
    </div>

    <!-- Calendar Navigation -->
    <v-card class="mb-6" elevation="1">
      <v-card-text class="pa-4">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center gap-3">
            <v-btn
              icon
              variant="text"
              @click="previousMonth"
              class="mr-2"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <h4 class="text-h6 font-weight-bold mb-0">
              {{ currentMonthYear }}
            </h4>
            <v-btn
              icon
              variant="text"
              @click="nextMonth"
              class="ml-2"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>

          <div class="d-flex gap-2">
            <v-btn
              :variant="viewMode === 'month' ? 'elevated' : 'outlined'"
              :color="viewMode === 'month' ? 'primary' : 'default'"
              @click="setViewMode('month')"
              size="small"
            >
              Month
            </v-btn>
            <v-btn
              :variant="viewMode === 'week' ? 'elevated' : 'outlined'"
              :color="viewMode === 'week' ? 'primary' : 'default'"
              @click="setViewMode('week')"
              size="small"
            >
              Week
            </v-btn>
            <v-btn
              :variant="viewMode === 'day' ? 'elevated' : 'outlined'"
              :color="viewMode === 'day' ? 'primary' : 'default'"
              @click="setViewMode('day')"
              size="small"
            >
              Day
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Month View -->
    <div v-if="viewMode === 'month'" class="month-view">
      <!-- Day Headers -->
      <div class="calendar-grid-header mb-2">
        <div
          v-for="day in weekDays"
          :key="day"
          class="calendar-day-header text-center pa-2"
        >
          <span class="text-body-2 font-weight-medium">{{ day }}</span>
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="calendar-grid">
        <div
          v-for="(week, weekIndex) in calendarWeeks"
          :key="weekIndex"
          class="calendar-week"
        >
          <div
            v-for="(day, dayIndex) in week"
            :key="dayIndex"
            :class="[
              'calendar-day',
              'pa-2',
              {
                'other-month': !day.isCurrentMonth,
                'today': day.isToday,
                'has-events': day.events.length > 0
              }
            ]"
            @click="selectDate(day.date)"
          >
            <div class="d-flex align-center justify-space-between mb-1">
              <span
                :class="[
                  'text-body-2',
                  {
                    'font-weight-bold': day.isToday,
                    'text-medium-emphasis': !day.isCurrentMonth
                  }
                ]"
              >
                {{ day.dayNumber }}
              </span>
              <v-badge
                v-if="day.events.length > 0"
                :content="day.events.length"
                color="primary"
                size="small"
              />
            </div>

            <!-- Event Preview -->
            <div v-if="day.events.length > 0" class="events-preview">
              <div
                v-for="event in day.events.slice(0, 2)"
                :key="event.id"
                :class="[
                  'event-preview',
                  `event-${event.type}`,
                  'text-caption',
                  'pa-1',
                  'mb-1',
                  'rounded'
                ]"
                @click.stop="openEventDetails(event)"
              >
                {{ event.title }}
              </div>
              <div
                v-if="day.events.length > 2"
                class="text-caption text-medium-emphasis text-center"
              >
                +{{ day.events.length - 2 }} more
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Week View -->
    <div v-else-if="viewMode === 'week'" class="week-view">
      <v-card elevation="1">
        <v-card-text class="pa-0">
          <div class="week-timeline">
            <div
              v-for="hour in businessHours"
              :key="hour"
              class="week-hour-row"
            >
              <div class="week-hour-label pa-2">
                {{ formatHour(hour) }}
              </div>
              <div class="week-hour-slots">
                <div
                  v-for="day in weekDays"
                  :key="day"
                  class="week-slot pa-1"
                >
                  <div
                    v-for="event in getEventsForHour(day, hour)"
                    :key="event.id"
                    :class="[
                      'week-event',
                      `event-${event.type}`,
                      'pa-2',
                      'rounded',
                      'text-caption'
                    ]"
                    @click="openEventDetails(event)"
                  >
                    {{ event.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Day View -->
    <div v-else class="day-view">
      <v-card elevation="1">
        <v-card-text class="pa-0">
          <div class="day-timeline">
            <div
              v-for="hour in businessHours"
              :key="hour"
              class="day-hour-row"
            >
              <div class="day-hour-label pa-3">
                {{ formatHour(hour) }}
              </div>
              <div class="day-hour-content pa-2">
                <div
                  v-for="event in getEventsForHour(selectedDate, hour)"
                  :key="event.id"
                  :class="[
                    'day-event',
                    `event-${event.type}`,
                    'pa-3',
                    'rounded',
                    'mb-2'
                  ]"
                  @click="openEventDetails(event)"
                >
                  <div class="d-flex align-center justify-space-between">
                    <h6 class="text-body-1 font-weight-medium mb-1">
                      {{ event.title }}
                    </h6>
                    <v-chip
                      :color="getEventTypeColor(event.type)"
                      size="small"
                      variant="elevated"
                    >
                      {{ event.type }}
                    </v-chip>
                  </div>
                  <p class="text-body-2 text-medium-emphasis mb-0">
                    {{ event.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Upcoming Events -->
    <v-card class="mt-6" elevation="1">
      <v-card-title class="text-h6 pa-4">
        Upcoming Events
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list>
          <v-list-item
            v-for="event in upcomingEvents"
            :key="event.id"
            class="pa-4"
          >
            <template #prepend>
              <v-avatar
                :color="getEventTypeColor(event.type)"
                size="40"
                class="mr-3"
              >
                <v-icon :icon="getEventTypeIcon(event.type)" color="white" />
              </v-avatar>
            </template>

            <v-list-item-title class="text-body-1 font-weight-medium mb-1">
              {{ event.title }}
            </v-list-item-title>

            <v-list-item-subtitle class="text-body-2 text-medium-emphasis mb-2">
              {{ event.description }}
            </v-list-item-subtitle>

            <div class="d-flex align-center justify-space-between">
              <span class="text-caption text-medium-emphasis">
                {{ formatEventTime(event.startTime) }}
              </span>

              <div class="d-flex gap-2">
                <v-btn
                  size="small"
                  variant="text"
                  color="primary"
                  @click="openEventDetails(event)"
                >
                  View Details
                </v-btn>
                <v-btn
                  size="small"
                  variant="text"
                  color="error"
                  @click="deleteEvent(event.id)"
                >
                  Delete
                </v-btn>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Add Event Dialog -->
    <v-dialog v-model="addEventDialog" max-width="600">
      <v-card>
        <v-card-title class="text-h6 pa-4">
          Add New Event
        </v-card-title>
        <v-card-text class="pa-4">
          <v-form ref="eventForm" v-model="eventFormValid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newEvent.title"
                  label="Event Title"
                  required
                  :rules="[v => !!v || 'Title is required']"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="newEvent.description"
                  label="Description"
                  rows="3"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="newEvent.type"
                  label="Event Type"
                  :items="eventTypes"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="newEvent.priority"
                  label="Priority"
                  :items="priorityLevels"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="newEvent.startTime"
                  label="Start Time"
                  type="datetime-local"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="newEvent.endTime"
                  label="End Time"
                  type="datetime-local"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            variant="outlined"
            @click="addEventDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="saveEvent"
            :disabled="!eventFormValid"
          >
            Save Event
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Event Details Dialog -->
    <v-dialog v-model="eventDetailsDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 pa-4">
          Event Details
        </v-card-title>
        <v-card-text class="pa-4">
          <div v-if="selectedEvent">
            <h6 class="text-body-1 font-weight-medium mb-2">
              {{ selectedEvent.title }}
            </h6>
            <p class="text-body-2 text-medium-emphasis mb-3">
              {{ selectedEvent.description }}
            </p>
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-calendar" class="mr-2" color="primary" />
              <span class="text-body-2">
                {{ formatEventDate(selectedEvent.startTime) }}
              </span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-clock" class="mr-2" color="primary" />
              <span class="text-body-2">
                {{ formatEventTime(selectedEvent.startTime) }} - {{ formatEventTime(selectedEvent.endTime) }}
              </span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-tag" class="mr-2" color="primary" />
              <v-chip
                :color="getEventTypeColor(selectedEvent.type)"
                size="small"
                variant="elevated"
              >
                {{ selectedEvent.type }}
              </v-chip>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            color="primary"
            @click="eventDetailsDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface CalendarEvent {
  id: string
  title: string
  description: string
  type: 'interview' | 'meeting' | 'deadline' | 'reminder'
  priority: 'low' | 'medium' | 'high'
  startTime: string
  endTime: string
  date: Date
}

interface CalendarDay {
  date: Date
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
}

// Reactive data
const viewMode = ref<'month' | 'week' | 'day'>('month')
const currentDate = ref(new Date())
const selectedDate = ref(new Date())
const addEventDialog = ref(false)
const eventDetailsDialog = ref(false)
const selectedEvent = ref<CalendarEvent | null>(null)
const eventFormValid = ref(false)

// Form data
const newEvent = ref({
  title: '',
  description: '',
  type: 'meeting' as CalendarEvent['type'],
  priority: 'medium' as CalendarEvent['priority'],
  startTime: '',
  endTime: '',
})

// Constants
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const businessHours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM
const eventTypes = [
  { title: 'Interview', value: 'interview' },
  { title: 'Meeting', value: 'meeting' },
  { title: 'Deadline', value: 'deadline' },
  { title: 'Reminder', value: 'reminder' },
]
const priorityLevels = [
  { title: 'Low', value: 'low' },
  { title: 'Medium', value: 'medium' },
  { title: 'High', value: 'high' },
]

// Sample events data
const events = ref<CalendarEvent[]>([
  {
    id: '1',
    title: 'Interview with John Doe',
    description: 'Technical interview for Senior Developer position',
    type: 'interview',
    priority: 'high',
    startTime: '2024-01-15T14:00:00',
    endTime: '2024-01-15T15:00:00',
    date: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Team Standup',
    description: 'Daily team synchronization meeting',
    type: 'meeting',
    priority: 'medium',
    startTime: '2024-01-15T09:00:00',
    endTime: '2024-01-15T09:30:00',
    date: new Date('2024-01-15'),
  },
  {
    id: '3',
    title: 'Application Deadline',
    description: 'Last day to submit candidate applications',
    type: 'deadline',
    priority: 'high',
    startTime: '2024-01-20T23:59:00',
    endTime: '2024-01-20T23:59:00',
    date: new Date('2024-01-20'),
  },
])

// Computed properties
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
})

const calendarWeeks = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const weeks: CalendarDay[][] = []
  let currentWeek: CalendarDay[] = []

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const day: CalendarDay = {
      date: new Date(date),
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isToday(date),
      events: getEventsForDate(date),
    }

    currentWeek.push(day)

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  return weeks
})

const upcomingEvents = computed(() => {
  const now = new Date()
  return events.value
    .filter(event => new Date(event.startTime) > now)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5)
})

// Methods
const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const getEventsForDate = (date: Date) => {
  return events.value.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.toDateString() === date.toDateString()
  })
}

const getEventsForHour = (date: Date | string, hour: number) => {
  return events.value.filter(event => {
    const eventDate = new Date(event.startTime)
    const targetDate = typeof date === 'string' ? new Date(date) : date
    return eventDate.getDate() === targetDate.getDate() &&
           eventDate.getMonth() === targetDate.getMonth() &&
           eventDate.getFullYear() === targetDate.getFullYear() &&
           eventDate.getHours() === hour
  })
}

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

const setViewMode = (mode: 'month' | 'week' | 'day') => {
  viewMode.value = mode
}

const selectDate = (date: Date) => {
  selectedDate.value = date
  if (viewMode.value === 'month') {
    viewMode.value = 'day'
  }
}

const openAddEventDialog = () => {
  addEventDialog.value = true
  // Set default times
  const now = new Date()
  newEvent.value.startTime = now.toISOString().slice(0, 16)
  const endTime = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour later
  newEvent.value.endTime = endTime.toISOString().slice(0, 16)
}

const saveEvent = () => {
  if (eventFormValid.value) {
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.value.title,
      description: newEvent.value.description,
      type: newEvent.value.type,
      priority: newEvent.value.priority,
      startTime: newEvent.value.startTime,
      endTime: newEvent.value.endTime,
      date: new Date(newEvent.value.startTime),
    }

    events.value.push(event)

    // Reset form
    newEvent.value = {
      title: '',
      description: '',
      type: 'meeting',
      priority: 'medium',
      startTime: '',
      endTime: '',
    }

    addEventDialog.value = false
  }
}

const openEventDetails = (event: CalendarEvent) => {
  selectedEvent.value = event
  eventDetailsDialog.value = true
}

const deleteEvent = (eventId: string) => {
  const index = events.value.findIndex(e => e.id === eventId)
  if (index > -1) {
    events.value.splice(index, 1)
  }
}

const syncCalendar = () => {
  // Simulate calendar sync
  console.log('Syncing calendar...')
}

const formatHour = (hour: number) => {
  return hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`
}

const formatEventTime = (timeString: string) => {
  return new Date(timeString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

const formatEventDate = (timeString: string) => {
  return new Date(timeString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getEventTypeColor = (type: string) => {
  const colors = {
    interview: 'success',
    meeting: 'primary',
    deadline: 'warning',
    reminder: 'info',
  }
  return colors[type as keyof typeof colors] || 'primary'
}

const getEventTypeIcon = (type: string) => {
  const icons = {
    interview: 'mdi-account-tie',
    meeting: 'mdi-account-group',
    deadline: 'mdi-clock-alert',
    reminder: 'mdi-bell',
  }
  return icons[type as keyof typeof icons] || 'mdi-calendar'
}

// Lifecycle
onMounted(() => {
  // Initialize with current date
  currentDate.value = new Date()
  selectedDate.value = new Date()
})
</script>

<style scoped>
.calendar-container {
  max-width: 100%;
}

.calendar-header h3 {
  color: var(--v-primary-base);
}

.calendar-grid-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-day-header {
  background-color: var(--v-surface-variant);
  font-weight: 500;
}

.calendar-grid {
  display: grid;
  gap: 1px;
}

.calendar-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-day {
  min-height: 120px;
  background-color: var(--v-surface);
  border: 1px solid var(--v-border-light);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.calendar-day:hover {
  background-color: var(--v-surface-variant);
}

.calendar-day.other-month {
  background-color: var(--v-surface-variant);
  opacity: 0.6;
}

.calendar-day.today {
  background-color: var(--v-primary-lighten5);
  border-color: var(--v-primary-base);
}

.calendar-day.has-events {
  background-color: var(--v-primary-lighten5);
}

.events-preview {
  margin-top: 4px;
}

.event-preview {
  font-size: 0.75rem;
  color: white;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-interview {
  background-color: var(--v-success-base);
}

.event-meeting {
  background-color: var(--v-primary-base);
}

.event-deadline {
  background-color: var(--v-warning-base);
}

.event-reminder {
  background-color: var(--v-info-base);
}

.week-timeline {
  display: grid;
  grid-template-columns: 80px 1fr;
}

.week-hour-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  border-bottom: 1px solid var(--v-border-light);
}

.week-hour-label {
  background-color: var(--v-surface-variant);
  font-size: 0.875rem;
  font-weight: 500;
}

.week-hour-slots {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.week-slot {
  min-height: 60px;
  border-right: 1px solid var(--v-border-light);
}

.week-event {
  color: white;
  cursor: pointer;
  margin-bottom: 2px;
  font-size: 0.75rem;
}

.day-timeline {
  display: grid;
  grid-template-columns: 80px 1fr;
}

.day-hour-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  border-bottom: 1px solid var(--v-border-light);
}

.day-hour-label {
  background-color: var(--v-surface-variant);
  font-size: 0.875rem;
  font-weight: 500;
}

.day-hour-content {
  min-height: 80px;
}

.day-event {
  color: white;
  cursor: pointer;
}

.gap-3 {
  gap: 12px;
}

.gap-2 {
  gap: 8px;
}
</style>
