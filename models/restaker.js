const mongoose = require('mongoose');

const RestakerSchema = new mongoose.Schema({
  userAddress: String,
  amountRestakedStETH: String,
  targetAVSOperatorAddress: String,
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaker', RestakerSchema);
