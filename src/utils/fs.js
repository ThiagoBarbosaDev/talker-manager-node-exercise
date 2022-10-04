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

const updateJsonEntry = async (payload, paramId) => {
  const data = await readJson();
  const filteredData = data.filter((item) => item.id !== +paramId);
  const unfilteredData = data.filter((item) => item.id === +paramId);
  const { id } = unfilteredData[0];
  const newPayload = { id, ...payload };

  const newData = [...filteredData, newPayload];
  const sortedData = newData.sort((a, b) => a.id - b.id);

  await fs.writeFile(fullpath, JSON.stringify(sortedData));
  return newPayload;
};

module.exports = { readJson, addEntryToJson, updateJsonEntry };
