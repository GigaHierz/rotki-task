import { CRYPTO_CURRENCYS } from '@/data/data'
import BalancesService from '@/services/BalancesService'
import type { BalancesFlattened } from '@/types/types'
import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('BalanceStore', {
  state: () => ({
    response: {},
    accounts: [],
    balances: [],
    balancesSum: [],
    balancesForAccount: [],
    sum: 0
  }),
  getters: {
    getAccounts () {
      this.accounts = Object.keys(this.response)
    },
    getSum () {
      this.sum = this.balances.reduce(
        (acc, curr) => acc + parseInt(curr.usd_value),
        0
      )
    },
    getAllBalances () {
      this.accounts.map(account => {
        Object.keys(CRYPTO_CURRENCYS).map(currency => {
          this.response[account][currency]?.amount &&
            this.balances.push({
              account,
              currency,
              amount: this.response[account][currency]?.amount,
              usd_value: this.response[account][currency]?.usd_value
            })
        })
      })
    },
    getBalancesForAccount: state => (account: string) => {
      state.balancesForAccount = state.balances.filter(
        balance => balance.account === account
      )
    },
    getOverviewOfAllCurrencies () {
      this.balancesSum = Object.values(
        this.balances.reduce((acc, curr) => {
          if (!acc[curr.currency]) {
            acc[curr.currency] = {
              currency: curr.currency,
              amount: curr.amount,
              usd_value: curr.usd_value,
              percentage: parseInt(curr.usd_value) / this.sum
            }
          } else {
            acc[curr.currency] = {
              currency: curr.currency,
              amount: (
                parseInt(curr.amount) + parseInt(acc[curr.currency].amount)
              ).toString(),
              usd_value: (
                parseInt(curr.usd_value) +
                parseInt(acc[curr.currency].usd_value)
              ).toString(),
              percentage:
                (parseInt(curr.usd_value) +
                  parseInt(acc[curr.currency].usd_value)) /
                this.sum
            }
          }
          return acc
        }, {})
      )
    }
  },
  actions: {
    fetchBalances () {
      return BalancesService.getBalances()
        .then(response => {
          console.log(response)

          this.response = response
        })
        .catch(error => {
          throw error
        })
    }
  }
})

// getTotalSum  (obj, objectKey: string)  {
//   // console.log(obj);

//   Object.keys(obj).forEach((key) => {
//     // console.log(`key: ${key}, value: ${obj[key]}`);

//     if (key == objectKey) {
//       sum += Number(obj[key]);
//       // console.log(obj[key]);
//       console.log(sum);
//     }

//     if (typeof obj[key] === "object" && obj[key] !== null) {
//       getTotalSum(obj[key], objectKey);
//     }
//   });

//   return sum;
// };

// const getAssetInfo = (
//   obj: Account | Currency,
//   objectKey: string,
//   account?: string
// ): AssetInfo => {
//   // console.log(obj);

//   account
//     ? Object.keys(obj).forEach((key) => {
//         if (key == objectKey) {
//           assetSum = Number(obj[account][key].amount);
//           assetSumUSD = Number(obj[account][key].usd_value);
//         }

//         // if (typeof obj[key] === "object" && obj[key] !== null) {
//         //   getAssetInfo(obj[account][key], objectKey);
//         // }
//       })
//     : Object.keys(obj).forEach((key) => {
//         if (key == objectKey) {
//           assetSum += Number((obj[key] as Currency).amount);
//           assetSumUSD += Number((obj[key] as Currency).usd_value);
//         }

//         if (typeof obj[key] === "object" && obj[key] !== null) {
//           getAssetInfo(obj[key] as Currency, objectKey);
//         }
//       });

//   let percentage = assetSumUSD / sum;

//   console.log(objectKey, assetSum, assetSumUSD, percentage);

//   return { objectKey, assetSum, assetSumUSD, percentage };
// };

// const getBalances = async (account?: string) => {
//   let assetList = [];
//   await client("balances").then((data) => {
//     // console.log(data);
//     userData = data.result;
//     const userAccounts = Object.keys(userData);
//     const totalSum = getTotalSum(userData, "usd_value");
//     Object.keys(CRYPTO_CURRENCYS).map((currency) =>
//       assetList.push(getAssetInfo(userData, currency, account))
//     );
//     // console.log(assetList);

//     // const assetList =
//     // Object.values(
//     //   userData[userAccounts[0]].reduce((a, b) => a.usd_value + b.usd_value, 0)
//     // );

//     return { userAccounts, totalSum, assetList };
//   });
// };
