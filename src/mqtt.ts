import MQTT, { IClientPublishOptions } from 'async-mqtt'
import { gzipSync } from 'zlib'

export const publish = async ({
  broker,
  topic,
  payload,
  qos,
  retain
}: MQTTConfiguration): Promise<void> => {
  const client = await MQTT.connectAsync(broker, {
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
    qos: qos ? qos : 1,
    retain: retain ? retain : false,
  }
  await client.publish(topic, compressed, options)
  await client.end()
}
