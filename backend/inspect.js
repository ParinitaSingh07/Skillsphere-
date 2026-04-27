import db from './DB.js';
db.query('DESCRIBE categories', (err, rows) => {
  console.log(JSON.stringify(rows?.map(r => r.Field)));
  db.end();
});
