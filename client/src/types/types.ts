import { CRYPTO_CURRENCY } from '@/data/data'

export interface TransactionEvent {
  readonly event_type: 'deposit' | 'withdraw'
  readonly asset: CRYPTO_CURRENCY
  readonly value: Value
  readonly timestamp: number
}

export interface Value {
  readonly amount: string
  readonly usd_value: string
}

export interface TransactionEvents {
  readonly events: TransactionEvent[]
}

export interface Account {
  readonly [address: string]: Value | TransactionEvents
}
