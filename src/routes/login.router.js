const express = require('express');
const { generateToken } = require('../helpers');
const { validateLogin } = require('../middlewares/loginMiddlewares');

const router = express.Router();
// avaliador não rodou, novo comentario para novo push
router.post('/', validateLogin, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;