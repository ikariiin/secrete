import { Listener } from "../listener";
import { Client, Message, User, DMChannel } from "discord.js";
import {User as UserEntity} from "../../../entity/user";
import { Connection } from "typeorm";
import { generate } from "password-hash";

export class Register implements Listener {
  private client?: Client;
  private dbConnection: Connection;

  public constructor(dbConn: Connection) {
    this.dbConnection = dbConn;
  }

  public setClient(client: Client): void {
    this.client = client;
  }

  public listeningCommand(): string {
    return "register";
  }

  public hit(message: Message): void {
    const user = message.author;
    this.conversate(user);
  }

  private async usernamePrompt(dm: DMChannel): Promise<void> {
    await dm.send(
      `Hey there! Let's get you signed up for the secret santa event!
Your username has been set the same as your dicord tag ${dm.recipient.username}#${dm.recipient.discriminator}`
    );
  }

  private async passwordPrompt(dm: DMChannel, username: string): Promise<NodeJS.Timeout> {
    await dm.send(
      `Alrighty, set your username as *${username}*
Now let's get you a secret phrase, type one out!`
    );

    return setTimeout(async () => {
      await dm.send(
        "Sorry, I didn't qutie get you, could we try that again?"
      );
    }, 20000);
  }

  private async emailPrompt(dm: DMChannel): Promise<NodeJS.Timeout> {
    await dm.send(
      `Almost done, now we just need your email! Your email would be used for if the randomized reciepient wants to contact the sender for any crucial information`
    );

    return setTimeout(async () => {
      await dm.send(
        "Sorry, I didn't qutie get you, could we try that again?"
      );
    }, 20000);
  }

  protected async conversate(user: User): Promise<void> {
    const dm = await user.createDM();
    const registrationUser = new UserEntity();

    await this.usernamePrompt(dm);
    registrationUser.username = `${dm.recipient.username}#${dm.recipient.discriminator}`;

    const passwordCollector = dm.createMessageCollector(() => true);
    const passwordTimeout = await this.passwordPrompt(dm, registrationUser.username);
    
    passwordCollector.on('collect', async (message: Message) => {
      registrationUser.password = generate(message.content);
      clearTimeout(passwordTimeout);

      passwordCollector.stop();

      const emailCollector = dm.createMessageCollector(() => true);
      const emailTimeout = await this.emailPrompt(dm);

      emailCollector.on('collect', async (message: Message) => {
        registrationUser.email = message.content;
        clearTimeout(emailTimeout);

        emailCollector.stop();
        dm.send(
          `All done! All done! Now you can log in to http://ligma.tech to continue. And you are entered to the prize pool as well`
        );

        const savedUser = await this.dbConnection.manager.save(registrationUser);
      });
    });
  }
}