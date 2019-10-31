import * as React from 'react';
import "../scss/root.scss";
import {MuiThemeProvider} from "@material-ui/core";
import {AppTheme} from "../util/theme";
import {fetchCookie} from "../util/fetch-cookie";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Dashboard} from "../../dash/components/dashboard";
import { Login } from '../../login/components/login';

@observer
export class Root extends React.Component<{}> {
  @observable private accessToken?: string;

  constructor(props: any) {
    super(props);
    this.accessToken = window.localStorage.jwt;
  }

  private renderContent(): React.ReactNode {
    return <Dashboard />;
  }

  private renderOauthWindow(): React.ReactNode {
    return <Login onLogin={() => this.accessToken = window.localStorage.jwt} />;
  }

  public render() {
    return (
      <MuiThemeProvider theme={AppTheme}>
        {this.accessToken !== undefined ? this.renderContent() : this.renderOauthWindow()}
      </MuiThemeProvider>
    )
  }
}