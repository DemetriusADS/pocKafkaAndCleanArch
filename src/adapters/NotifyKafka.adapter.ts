import { NotifyTopicPort } from '@src/ports'
import { Kafka } from 'kafkajs'

export class NotifyKafkaAdapter implements NotifyTopicPort<any> {
  constructor(private readonly kafka: Kafka) {}

  async send({ topic, message }: NotifyTopicPort.Params<any>) {
    const producer = this.kafka.producer()
    await producer.connect()
    const toBeSended = {
      topic,
      messages: [{ value: JSON.stringify({ ...message }) }]
    }
    await producer.send(toBeSended)
    await producer.disconnect()
  }
}
