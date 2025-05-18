const { Pool } = require("pg"); //Importuje třídu Pool z balíčku pg.
require("dotenv").config(); //Načítá obsah souboru .env (environment variables) a zpřístupní proměnné v aplikaci pomocí process.env.

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

module.exports = pool; //Exportuje tento pool, aby mohl být použit v jiných částech aplikace.
