export interface IntervalStep {
  start: number
  end: number
  step: number
}

export interface Rule {
  date: any
  dayOfWeek: any
  second: IntervalStep | undefined | number
  minute: IntervalStep | undefined | number
  hour: IntervalStep | undefined | number
  year: IntervalStep | undefined | number
}

export interface ScheduleJobData {
  id: string
  functionName: string
  rule: Rule
}
