require('dotenv').config(); 

const defaults = {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

function parseDatabaseUrl(url) {
  try {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: u.port,
      database: u.pathname.replace(/^\//, ''),
      username: u.username,
      password: u.password
    };
  } catch (e) {
    return null;
  }
}

const envDb = process.env.DATABASE_URL ? parseDatabaseUrl(process.env.DATABASE_URL) : null;

const common = {
  username: process.env.DB_USER || (envDb && envDb.username) || 'postgres',
  password: process.env.DB_PASSWORD || (envDb && envDb.password) || '',
  database: process.env.DB_NAME || (envDb && envDb.database) || 'gescar_db',
  host: process.env.DB_HOST || (envDb && envDb.host) || '127.0.0.1',
  port: process.env.DB_PORT || (envDb && envDb.port) || 5432,
  dialectOptions: {}
};

if (process.env.DB_SSL === 'true' || process.env.NODE_ENV === 'production') {
  common.dialectOptions.ssl = { require: true, rejectUnauthorized: false };
}

module.exports = {
  development: { ...common, ...defaults },
  test: { ...common, database: process.env.DB_NAME_TEST || `${common.database}_test`, ...defaults },
  production: { ...common, ...defaults }
};