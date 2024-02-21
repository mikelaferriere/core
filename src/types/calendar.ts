export interface Person {
  email: string
}

export interface EventDate {
  date?: string
  dateTime?: string
  timeZone?: string
}

export interface BaseEvent {
  id?: string
  location?: string
  status?: string
  htmlLink?: string
  created?: string
  updated?: string
  summary?: string
  description?: string
  creator?: Person
  organizer?: Person
  start?: EventDate
  end?: EventDate
  originalStartTime?: EventDate
  attendees?: Person[]
  recurrence?: string[]
}

export interface Event extends BaseEvent {
  id: string
  htmlLink?: string
  created: string
  updated: string
  summary: string
  creator: Person
  organizer: Person
  start: EventDate
  end: EventDate
  originalStartTime: EventDate
  attendees: Person[]
}

export interface CreateEvent extends BaseEvent {
  summary: string
  location: string
  description: string
  start: EventDate
  end: EventDate
  recurrence: string[]
  attendees: Person[]
}
