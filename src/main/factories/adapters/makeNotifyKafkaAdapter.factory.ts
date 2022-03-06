import { NotifyKafkaAdapter } from '@src/adapters'
import { makeKafkaFactory } from '../libs'

const makeNotifyKafkaAdapter = () => new NotifyKafkaAdapter(makeKafkaFactory())

export { makeNotifyKafkaAdapter }
