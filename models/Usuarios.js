'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Creando el esquema que tendran los usuarios en la base de datos
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

// método estáico
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
}

// método de instancia
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
}

// crear el modelo en la base de datos
const Usuarios = mongoose.model('Usuario', usuarioSchema);

// exporto el modelo de la base de datos
module.exports = Usuarios;