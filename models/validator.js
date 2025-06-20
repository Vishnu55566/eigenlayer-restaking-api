const mongoose = require('mongoose');

const ValidatorSchema = new mongoose.Schema({
  operatorAddress: String,
  totalDelegatedStakeStETH: String,
  slashHistory: [
    {
      timestamp: Number,
      amountStETH: String,
      reason: String
    }
  ],
  status: String,
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Validator', ValidatorSchema);
