const express = require('express');
const { readJson } = require('../utils/fs');

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await readJson();
  if (!data.length) { return res.status(200).json([]); }
  res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
  const errorMsg = {
    message: 'Pessoa palestrante não encontrada',
  };

  const data = await readJson();
  const { id: paramId } = req.params;

  const person = data.find(({ id }) => id === Number(paramId));
  console.log(person);
  if (!person) { return res.status(404).json(errorMsg); }
  res.status(200).json(person);
});

module.exports = router;