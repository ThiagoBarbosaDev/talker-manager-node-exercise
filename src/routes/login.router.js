const express = require('express');
const { generateToken } = require('../helpers');

const router = express.Router();

router.post('/', (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;