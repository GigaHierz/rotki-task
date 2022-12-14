# rotki frontend task Description

The task follows a typical protocol addition in rotki. There are two endpoints that provide the balances and events for a user's ethereum accounts.

Using the data from these endpoints, you need to build a frontend using Vue and TypeScript that fetches the data from these endpoints and displays them to the user.
The frontend should show the following information to the user.

A sum of the total USD value of all the user's assets.
A list that contains the asset, amount, USD value [1] and the percentage [2]. A list of the events for the user's accounts [3].
A filter that allows you to select only a specific account to display.

# Setup

For the task you will need to use json-server (https://github.com/typicode/json-server) to mock the endpoints. To install the json server you need to run the following:

`npm install -g json-server`
You will need to used the provided json file named db.json.
Then you can start the json-server using:

`json-server --watch db.json`

This will give you access to the two following endpoints that you can use to fetch the data that will be displayed in the frontend:

1. Ifthesameassetiscontainedinmultipleaddressesthenthevaluesshouldbesummed.↩
2. ThepercentageshouldbebasedontheUSDvalueoftheassetcomparedtothetotalUSD
   value. ↩
3. Theeventlistshouldalsocontaintheaddressoftheaccountwheretheeventoriginated from. ↩
