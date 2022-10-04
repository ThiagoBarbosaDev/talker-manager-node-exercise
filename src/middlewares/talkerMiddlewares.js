const TOKEN_NOT_FOUND_ERROR = {
  message: 'Token não encontrado',
};
const INVALID_TOKEN_ERROR = {
  message: 'Token inválido',
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) { return res.status(401).json(TOKEN_NOT_FOUND_ERROR); }

  const validAuthLength = 16;
  const isAuthInvalid = authorization.length !== validAuthLength;

  if (isAuthInvalid) { return res.status(401).json(INVALID_TOKEN_ERROR); }

  next();
};

const NAME_NOT_FOUND_ERROR = {
  message: 'O campo "name" é obrigatório',
};

const NAME_TOO_SHORT_ERROR = {
  message: 'O "name" deve ter pelo menos 3 caracteres',
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) { return res.status(400).json(NAME_NOT_FOUND_ERROR); }
  
  const minNameLength = 3;
  if (name.length < minNameLength) { return res.status(400).json(NAME_TOO_SHORT_ERROR); }
  next();
};

const AGE_IS_REQUIRED_ERROR = {
  message: 'O campo "age" é obrigatório',
};

const MIN_AGE_IS_REQUIRED_ERROR = {
  message: 'A pessoa palestrante deve ser maior de idade',
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  
  if (!age) { return res.status(400).json(AGE_IS_REQUIRED_ERROR); }

  const minAge = 18;
  if (age < minAge) { return res.status(400).json(MIN_AGE_IS_REQUIRED_ERROR); }
  next();
};

const TALK_NOT_FOUND_ERROR = {
  message: 'O campo "talk" é obrigatório',
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) { return res.status(400).json(TALK_NOT_FOUND_ERROR); }
  next();
};

const WATCHED_AT_NOT_FOUND_ERROR = {
  message: 'O campo "watchedAt" é obrigatório',
};
const INVALID_WATCHED_AT_ERROR = {
  message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;

  if (!watchedAt) { return res.status(400).json(WATCHED_AT_NOT_FOUND_ERROR); }
  
  const dateFormatRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const isDataFormatInvalid = !dateFormatRegex.test(watchedAt);
  if (isDataFormatInvalid) { return res.status(400).json(INVALID_WATCHED_AT_ERROR); }

  next();
};

const RATE_NOT_FOUND_ERROR = {
  message: 'O campo "rate" é obrigatório',
};
const INVALID_RATE_ERROR = {
  message: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const rateExistsAndIsNotZero = (rate) => {
  console.log(rate);
  return !rate && rate !== 0;
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rateExistsAndIsNotZero(rate)) { return res.status(400).json(RATE_NOT_FOUND_ERROR); }

  const minRate = 1;
  const maxRate = 5;
  const isRateInvalid = !Number.isInteger(rate) || rate < minRate || rate > maxRate;
  if (isRateInvalid) { return res.status(400).json(INVALID_RATE_ERROR); }

  next();
};

module.exports = { 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};