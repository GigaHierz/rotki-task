<script setup lang="ts">
import ListTemplate from "./ListTemplate.vue";
import { eventsTitles, CRYPTO_CURRENCYS } from "../data/data";
import {
  Account,
  Currency,
  AssetInfo,
  TransactionEvents,
} from "../types/types";
import { useEventStore } from "../stores/EventStore";
import { client } from "../../utils/client";

const props = defineProps({
  events: { required: true, type: String },
});

const eventStore = useEventStore();
const eventTitles = eventsTitles;
let userData: Array<TransactionEvents>;
let sum = 0;
let assetSum = 0;
let assetSumUSD = 0;
let assetListTemp = [];

const getTotalSum = (obj, objectKey: string) => {
  // console.log(obj);

  Object.keys(obj).forEach((key) => {
    // console.log(`key: ${key}, value: ${obj[key]}`);

    if (key == objectKey) {
      sum += Number(obj[key]);
      // console.log(obj[key]);
      console.log(sum);
    }

    if (typeof obj[key] === "object" && obj[key] !== null) {
      getTotalSum(obj[key], objectKey);
    }
  });

  return sum;
};

const getAssetInfo = (
  obj: Account | Currency,
  objectKey: string,
  account?: string
): AssetInfo => {
  // console.log(obj);

  account
    ? Object.keys(obj).forEach((key) => {
        if (key == objectKey) {
          assetSum = Number(obj[account][key].amount);
          assetSumUSD = Number(obj[account][key].usd_value);
        }

        // if (typeof obj[key] === "object" && obj[key] !== null) {
        //   getAssetInfo(obj[account][key], objectKey);
        // }
      })
    : Object.keys(obj).forEach((key) => {
        if (key == objectKey) {
          assetSum += Number((obj[key] as Currency).amount);
          assetSumUSD += Number((obj[key] as Currency).usd_value);
        }

        if (typeof obj[key] === "object" && obj[key] !== null) {
          getAssetInfo(obj[key] as Currency, objectKey);
        }
      });

  let percentage = assetSumUSD / sum;

  console.log(objectKey, assetSum, assetSumUSD, percentage);

  return { objectKey, assetSum, assetSumUSD, percentage };
};

const getEvents = async () => {
  await client("events").then((data) => {
    // console.log(data);
    userData = data.result;
  });
};

const getBalances = async (account?: string) => {
  let assetList = [];
  await client("balances").then((data) => {
    // console.log(data);
    userData = data.result;
    const userAccounts = Object.keys(userData);
    const totalSum = getTotalSum(userData, "usd_value");
    Object.keys(CRYPTO_CURRENCYS).map((currency) =>
      assetList.push(getAssetInfo(userData, currency, account))
    );
    // console.log(assetList);

    // const assetList =
    // Object.values(
    //   userData[userAccounts[0]].reduce((a, b) => a.usd_value + b.usd_value, 0)
    // );

    return { userAccounts, totalSum, assetList };
  });
};

getEvents();
getBalances("0xABC11a5aCc3ad66025C21f24a91dD71D0Fc28a46");

const getAccounts = () => {
  // console.log(userData);
};

getAccounts();
</script>

<template>
  <list-template :titles="eventTitles" />
  {{ eventStore.events }}

  <!-- <list-template :titles="[eventList[0].event_type]" /> -->
</template>
