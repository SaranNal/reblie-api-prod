// const { Sequelize } = require("sequelize");

// // Create a sequelize connection
// const sequelize = new Sequelize(
//     process.env.DB_DATABASE,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//      {
//        host: process.env.DB_HOST,
//        dialect: 'mysql'
//      }
//    );

// sequelize.authenticate().then(() => {
//     console.log('Database connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });   

//  module.exports = sequelize;