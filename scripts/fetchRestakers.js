const axios = require('axios');
const mongoose = require('mongoose');
const Restaker = require('../models/restaker');
require('dotenv').config();
const connectDB = require('../config/db');

const query = `
{
  restakings(first: 100) {
    restaker
    amount
    operator {
      id
    }
  }
}
`;

const fetchData = async () => {
  await connectDB();

  const url = 'https://gateway.thegraph.com/api/subgraphs/id/68g9WSC4QTUJmMpuSbgLNENrcYha4mPmXhWGCoupM7kB';

  try {
    const response = await axios.post(url, { query });
    const data = response.data.data.restakings;

    for (const item of data) {
      await Restaker.updateOne(
        { userAddress: item.restaker },
        {
          userAddress: item.restaker,
          amountRestakedStETH: item.amount,
          targetAVSOperatorAddress: item.operator.id,
          lastUpdated: new Date()
        },
        { upsert: true }
      );
    }

    console.log('Data fetched and saved successfully');
    process.exit();
  } catch (err) {
    console.error('Error fetching:', err.message);
    process.exit(1);
  }
};

fetchData();
