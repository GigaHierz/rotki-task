import { defineStore } from 'pinia'
import { TransactionEvents } from '../types/types'

export const useBalancesListStore = defineStore('balances', () => {
  let userData: Array<TransactionEvents>
  let sum = 0
  let assetList

  const getSum = (obj, objectKey) => {
    // console.log(obj);

    Object.keys(obj).forEach(key => {
      // console.log(`key: ${key}, value: ${obj[key]}`);

      if (key == objectKey) {
        sum += Number(obj[key])
        // console.log(obj[key]);
        console.log(sum)
      }

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        getSum(obj[key], objectKey)
      }
    })
  }

  const getCurrencySum = (obj, objectKey) => {
    // console.log(obj);

    Object.keys(obj).forEach(key => {
      // console.log(`key: ${key}, value: ${obj[key]}`);

      if (key == objectKey) {
        sum += Number(obj[key])
        // console.log(obj[key]);
        console.log(sum)
      }

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        getSum(obj[key], objectKey)
      }
    })
  }

  const getEvents = async () => {
    await client('events').then(data => {
      // console.log(data);
      userData = data.result
    })
  }

  const getBalances = async () => {
    await client('balances').then(data => {
      // console.log(data);
      userData = data.result
      const userAccounts = Object.keys(userData)
      getSum(userData, 'usd_value')
      // Object.values(
      //   userData[userAccounts[0]].reduce((a, b) => a.usd_value + b.usd_value, 0)
      // );
      // console.log(sum);
      // console.log(Object.keys(userData));
    })
  }

  getEvents()
  getBalances()

  const getAccounts = () => {
    console.log(userData)
  }
})
