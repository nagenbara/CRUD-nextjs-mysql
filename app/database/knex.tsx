import { Knex } from 'knex';

export const dbMySQL: Knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.NEXT_PUBLIC_HOST,
    port: process.env.NEXT_PUBLIC_PORT,
    user: process.env.NEXT_PUBLIC_USER,
    password: process.env.NEXT_PUBLIC_PASSWORD,
    database: process.env.NEXT_PUBLIC_DATABASE,
  },
});
