export interface Scene {
  id: string
  name: string
  group: string
}
export interface LightState {
  on: boolean
  bri: number
  alert: string
  mode: string
  reachable: boolean
}
export interface Light {
  id: number
  state: LightState
  type: string
  name: string
}
export interface Room {
  id: number
  name: string
  lights: number[]
  any_on: boolean
  all_on: boolean
  brightness: number
}
