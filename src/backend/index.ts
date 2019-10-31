import * as express from 'express';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { createConnection } from 'typeorm';
import * as config from "../bot/config.json";
import { User } from '../entity/user.js';
import { LoginRouter } from './routes/login.js';

async function start() {
  const app = express();

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

  app.use(express.json());

  app.use((req: express.Request, res: express.Response, next: any) => {
    req.dbConn = dbConnection;
    next();
  });

  app.use((req: express.Request, res: express.Response, next: Function) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  app.use("/login", LoginRouter);

  app.listen(80, () => console.log("Started listening on port 80"));
}

start();