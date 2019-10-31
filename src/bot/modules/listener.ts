import { Message, Client } from "discord.js";

export interface Listener {
  hit: (message: Message) => any;
  listeningCommand: () => string;
  setClient: (client: Client) => any;
}