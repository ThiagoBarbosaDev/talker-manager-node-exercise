const express = require('express');
const { readJson } = require('../utils/fs');

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await readJson();
  if (!data.length) { return res.status(200).json([]); }
  res.status(200).json(data);
});

// router.get('/:id', async (req, res) => {
//   const data = await readJson();
//   const { id } = req.params;

//   const data =
//   if (!data.length) { return res.status(200).json([]); }
//   res.status(200).json(data);
// });

module.exports = router;