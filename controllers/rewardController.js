const Reward = require('../models/reward');

exports.getRewardsByAddress = async (req, res) => {
  try {
    const { address } = req.params;
    const rewards = await Reward.findOne({ walletAddress: address });
    if (!rewards) return res.status(404).json({ msg: 'No rewards found' });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
