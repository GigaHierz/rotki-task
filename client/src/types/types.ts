import type { CRYPTO_CURRENCY } from '@/data/data'

export interface TransactionEvent {
  readonly event_type: 'deposit' | 'withdraw'
  readonly asset: CRYPTO_CURRENCY
  readonly value?: Value
  readonly timestamp: number
}

export interface TransactionEventFlattend extends TransactionEvent {
  account: string
  amount: string
  usd_value: string
}

export interface Value {
  readonly amount: string
  readonly usd_value: string
}

export interface TransactionEvents {
  readonly events: TransactionEvent[]
}

export interface Account {
  readonly [address: string]: Currency | TransactionEvents
}
export interface Currency {
  readonly [address: string]: Value
}

export interface BalancesFlattened extends Value {
  account: string
  currency: string
  percentage: number
}
