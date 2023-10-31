export interface Person {
  email: string
}

export interface EventDate {
  date?: string
  dateTime?: string
}

export interface Event {
  id: string
  status: string
  htmlLink: string
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
