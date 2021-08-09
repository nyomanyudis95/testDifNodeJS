const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

db.sync(); // mengcreate table dari model jika tidak ada

(async () => {
  try {
    await db.authenticate();
    console.log('db connection to mysql is success');
  } catch (err) {
    console.log('db connection mysql failed', err);
  }
})();

module.exports = db;
