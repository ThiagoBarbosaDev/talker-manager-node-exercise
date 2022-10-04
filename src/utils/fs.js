const fs = require('fs').promises;

const fullpath = './src/talker.json';

const readJson = async () => {
  const strJson = await fs.readFile(fullpath, 'utf-8');
  const data = await JSON.parse(strJson);
  return data;
};

const addEntryToJson = async (payload) => {
  const data = await readJson();

  const lastId = data.at(-1).id;
  const id = lastId + 1;
  const payloadWithId = { id, ...payload };
  const appendedData = [...data, payloadWithId];

  await fs.writeFile(fullpath, JSON.stringify(appendedData));

  return payloadWithId;
};

module.exports = { readJson, addEntryToJson };
