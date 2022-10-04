const express = require('express');
const { 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate } = require('../middlewares/talkerMiddlewares');
const { readJson, addEntryToJson, updateJsonEntry } = require('../utils/fs');

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

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  const data = req.body;
  const newData = await addEntryToJson(data);
  res.status(201).json(newData);
},
);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const newData = await updateJsonEntry(data, id);
  res.status(200).json(newData);
},
);

module.exports = router;