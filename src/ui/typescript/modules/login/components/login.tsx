import * as React from 'react';
import { Paper, TextField, Button, Typography } from '@material-ui/core';
import InfoIcon from "@material-ui/icons/InfoTwoTone";
import "../scss/login.scss";
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export class Login extends React.Component<{}> {
  @observable username: string = "";
  @observable password: string = "";

  private async login(): Promise<void> {
    const response = await fetch("http://localhost/login/", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    });
    const { jwt } = await response.json();

    window.localStorage.jwt = jwt;
  }

  public render(): React.ReactNode {
    return (
      <section className="login-container">
        <Paper elevation={16} className="login-paper">
          <div className="title">Log In to the Site</div>
          <TextField label="username" margin="normal" fullWidth value={this.username} onChange={(ev) => this.username = ev.target.value} />
          <TextField label="secret phrase" margin="normal" fullWidth value={this.password} type="password" onChange={(ev) => this.password = ev.target.value} />

          <Button size="large" color="primary" className="login-button" variant="contained" onClick={() => this.login()}>
            Log In
          </Button>

          <section className="info-container">
            <InfoIcon className="icon" />
            <Typography>
              To login you must authenticate first with the bot in the server.
            </Typography>
          </section>
        </Paper>
      </section>
    )
  }
}