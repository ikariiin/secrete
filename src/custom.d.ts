import {Connection} from "typeorm";

declare global {
  namespace Express {
    export interface Request {
      dbConn: Connection;
    }
  }
}