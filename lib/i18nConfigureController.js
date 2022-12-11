'use strict';

const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'es',
  autoReload: true,
  syncFiles: true,
  cookie: 'nodeapp-locale'
});

// para utilizar en scripts
i18n.setLocale('es');

module.exports = i18n;