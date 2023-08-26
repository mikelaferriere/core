import MQTT, { IClientPublishOptions, QoS } from 'async-mqtt'
import { gzipSync } from 'zlib'

const connectUrl = process.env.MQTT_BROKER

export const publish = async (
  topic: string,
  payload: Record<string, any>,
  qos: QoS = 1,
  retain = false
): Promise<void> => {
  const client = await MQTT.connectAsync(connectUrl, {
    clientId: `mqtt_${topic.replace('//', '_')}_${Math.random()
      .toString(16)
      .slice(3)}`,
    keepalive: 30,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    rejectUnauthorized: false,
    port: 9001,
  })

  const compressed = gzipSync(JSON.stringify(payload))

  const options: IClientPublishOptions = {
    qos,
    retain,
  }
  await client.publish(topic, compressed, options)
  await client.end()
}
