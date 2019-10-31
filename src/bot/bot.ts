import {Client} from 'discord.js';
import * as config from './config.json';
import { Bot } from './modules/root.js';
import { Register } from './modules/listeners/register.js';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../entity/user.js';
import { createConnection } from 'typeorm';

async function start() {
  const client = new Client();

  const typeormConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "john.db.elephantsql.com",
    port: 5432,
    username: config.db_user,
    password: config.db_pass,
    synchronize: true,
    database: "bpegfdai",
    entities: [
      User
    ]
  };

  const dbConnection = await createConnection(typeormConfig);

  client.on('ready', () => {
    const bot = new Bot(client, dbConnection);
    bot.addListener(new Register(dbConnection));

    bot.listen();
  });

  client.on('error', (error: Error) => {
    console.error(error.message);
  });

  client.login(config.bot_token);
}

try {
  start();
} catch (e) {
  console.error(e);
}
