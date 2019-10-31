import { Client, Message } from "discord.js";
import { Listener } from "./listener";
import { Connection } from "typeorm";

export class Bot {
  private client: Client;
  private listeningToken: string;
  private listeners: Array<Listener> = [];

  public constructor(client: Client, dbConnection: Connection, listeningToken: string = "$$") {
    this.client = client;
    this.listeningToken = listeningToken;
  }

  protected searchCommand(commandStr: string) {
    return this.listeners.filter(listener => listener.listeningCommand() === commandStr);
  }

  public addListener(listener: Listener) {
    listener.setClient(this.client);
    this.listeners.push(listener);
  }

  public listen(): void {
    this.client.on('message', (message: Message) => {
      if(!message.content.startsWith(this.listeningToken) || message.author.bot) return;
      const commandStr = message.content.slice(this.listeningToken.length).split(' ')[0];

      const listeners = this.searchCommand(commandStr);
      listeners.forEach(listener => listener.hit(message));
    });
  }
}