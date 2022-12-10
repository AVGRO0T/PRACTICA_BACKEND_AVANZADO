'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
const readLine = require('readline');

const async = require('async');

const db = require('./lib/connectMongoose');

// Cargamos las definiciones de todos nuestros modelos
const { Anuncio, Usuarios } = require('./models/index');

db.once('open', async function () {
  try {
    const answer = await askUser('Are you sure you want to empty DB? (no) ');
    if (answer.toLowerCase() === 'yes') {
      
      // Inicializar nuestros modelos
      await initAnuncios();
      await initUsuarios();
      
    } else {
      console.log('DB install aborted!');
    }
    return process.exit(0);
  } catch(err) {
    console.log('Error!', err);
    return process.exit(1);
  }
});

function askUser(question) {
  return new Promise((resolve, reject) => {
    const rl = readLine.createInterface({
      input: process.stdin, output: process.stdout
    });
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

async function initUsuarios() {

  // borrar todos los documentos de usuario
  const deleted = await Usuarios.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);
 
  // crear usuarios iniciales
  const inserted = await Usuarios.insertMany([
    { email: 'user@example.com', password: await Usuarios.hashPassword('1234') },
  ]);
  console.log(`Creados ${inserted.length} usuarios.`);
 
 }
 
async function initAnuncios() {

  await Anuncio.remove({});
  console.log('Anuncios borrados.');

  // Cargar anuncios.json
  const fichero = './anuncios.json';

  console.log('Cargando ' + fichero + '...');
  const numLoaded = await Anuncio.cargaJson(fichero);
  console.log(`Se han cargado ${numLoaded} anuncios.`);

  return numLoaded;

}


