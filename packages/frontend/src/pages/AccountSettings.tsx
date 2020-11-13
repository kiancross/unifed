import React from "react";
import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import AccountTab from "../components/AccountTab";
import { accountsClient } from "../utils/accounts";
import { Redirect } from "react-router";

enum UserStatus {
  FETCHING,
  LOGGED_IN,
  LOGGED_OUT,
}

interface State {
  gotUser: UserStatus;
  selectedTab: number;
  email: string;
  username: string;
}

class AccountSettings extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      gotUser: UserStatus.FETCHING,
      selectedTab: 0,
      email: "",
      username: "",
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.setDetails = this.setDetails.bind(this);
    this.handleLoggedOut = this.handleLoggedOut.bind(this);
  }

  handleTabChange(_event: React.ChangeEvent<unknown>, newValue: number): void {
    this.setState(() => ({
      selectedTab: newValue,
    }));
  }

  setDetails(username: string, email: string): void {
    this.setState(() => ({
      gotUser: UserStatus.LOGGED_IN,
      username: username,
      email: email,
    }));
  }

  handleLoggedOut(): void {
    this.setState(() => ({
      gotUser: UserStatus.LOGGED_OUT,
    }));
  }

  render() {
    if (this.state.gotUser === UserStatus.FETCHING) {
      accountsClient.getUser().then((user) => {
        if (!user) this.handleLoggedOut();
        else if (user.username && user.emails)
          this.setDetails(user.username, user.emails[0].address);
      });
    }

    if (this.state.gotUser === UserStatus.LOGGED_OUT) return <Redirect to="/" />;

    return (
      <Container maxWidth="sm">
        <AppBar position="static">
          <Tabs value={this.state.selectedTab} onChange={this.handleTabChange}>
            <Tab label="ACCOUNT" />
            <Tab label="PROFILE" />
          </Tabs>
        </AppBar>
        {this.state.selectedTab === 0 && (
          <AccountTab username={this.state.username} email={this.state.email} />
        )}
      </Container>
    );
  }
}

export default AccountSettings;
