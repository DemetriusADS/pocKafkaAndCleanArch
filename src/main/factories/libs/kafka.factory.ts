import { Kafka } from 'kafkajs'

const makeKafkaFactory = () =>
  new Kafka({
    clientId: 'LoginAndKafka',
    brokers: ['localhost:9092']
  })

export { makeKafkaFactory }
