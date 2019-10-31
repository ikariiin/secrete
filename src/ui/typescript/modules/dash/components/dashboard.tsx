import * as React from 'react';
import "../scss/dashboard.scss";
import {observable} from "mobx";
import {observer} from "mobx-react";

@observer
export class Dashboard extends React.Component<{}> {
  @observable private users: any;

  private async fetchProfile(): Promise<void> {
    //
  }

  constructor(props: any) {
    super(props);
    this.fetchProfile();
  }

  public render() {
    return (
      <main className="dashboard">
      </main>
    );
  }
}