const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  const locale = req.params.locale;

  // poner una cookie en la respuesta que indique el nuevo locale
  res.cookie('nodeapp-locale', locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30 // 1 mes
  })

  // hacer redirección a la misma página de donde venía la petición
  res.redirect(req.get('Referer'));
});

module.exports = router;