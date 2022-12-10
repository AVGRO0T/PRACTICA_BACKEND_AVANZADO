'use strict';

const jwt = require('jsonwebtoken');
const { Usuarios } = require('../../models');


class LoginAuthController {
// login post al API
async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la BD
      const usuario = await Usuarios.findOne({ email });

      // si no lo encuentro o no coincide la contraseña --> error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.status(401);
        res.json({ error: 'Invalid credentials' })
        return;
      }

      // si existe y la contraseña coincide

      // generar un token JWT con su _id
      const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
        expiresIn: '2h'
      });

      
      res.json({ token })
    } catch(err) {
      next(err);
    }
  }
  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('login');
  }
  
}

module.exports = LoginAuthController;