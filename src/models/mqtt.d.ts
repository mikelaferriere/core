interface MQTTConfiguration {
  broker: string
  topic: string
  payload: Record<string, any>
  qos?: QoS
  retain?: boolean
}