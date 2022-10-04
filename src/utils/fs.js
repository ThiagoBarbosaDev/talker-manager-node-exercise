const fs = require('fs').promises;

const fullpath = './src/talker.json';

const readJson = async () => {
  const strJson = await fs.readFile(fullpath, 'utf-8');
  const data = await JSON.parse(strJson);
  return data;
};

module.exports = { readJson };
