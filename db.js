const mariadb = require('mariadb');

async function getConnection() {
  try {
    const conn = await mariadb.createConnection({
      host: 'localhost',
      user: 'balux',
      password: '6913',
      database: 'celestial'
    });
    console.log(`connection ${conn.threadId} to DB on!`);
    return conn;
  } catch(err) {
    console.log(`${err}`);
    return null;
  }
}

module.exports = getConnection;
