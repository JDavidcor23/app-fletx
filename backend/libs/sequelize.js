const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
//traemos la funcion setupModels que nos permite configurar los modelos
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});
//le pasamos la instancia de la base de datos a la funcion setupModels
setupModels(sequelize);

// sequelize.sync es un metodo que nos permite sincronizar los modelos con la base de datos
// no es recomendable usarlo en produccion porque puede borrar la base de datos o sobreescribirla

// sequelize.sync();

// npm i sequelize-cli -D

module.exports = sequelize;
