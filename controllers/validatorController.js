const Validator = require('../models/validator');

exports.getValidators = async (req, res) => {
  try {
    const validators = await Validator.find({});
    res.json(validators);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
