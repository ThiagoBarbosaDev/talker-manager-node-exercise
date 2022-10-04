const NONEXISTING_EMAIL_ERROR_MESSAGE = {
  message: 'O campo "email" é obrigatório',
};

const NONEXISTING_PASSWORD_ERROR_MESSAGE = {
  message: 'O campo "password" é obrigatório',
};

const INVALID_PASSWORD_ERROR_MESSAGE = {
  message: 'O "password" deve ter pelo menos 6 caracteres',
};

const INVALID_EMAIL_ERROR_MESSAGE = {
  message: 'O "email" deve ter o formato "email@email.com"',
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) { return res.status(400).json(NONEXISTING_EMAIL_ERROR_MESSAGE); }
  if (!password) { return res.status(400).json(NONEXISTING_PASSWORD_ERROR_MESSAGE); }

  const minPasswordLength = 6;
  if (password.length < minPasswordLength) { 
    return res.status(400).json(INVALID_PASSWORD_ERROR_MESSAGE); 
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!emailRegex.test(email)) { return res.status(400).json(INVALID_EMAIL_ERROR_MESSAGE); }

next();
};

module.exports = { validateLogin };