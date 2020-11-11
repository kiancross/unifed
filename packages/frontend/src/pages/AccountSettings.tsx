import React from "react";
import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import AccountTab from "../components/AccountTab";
import { accountsClient, passwordClient } from "../utils/accounts";
import { Redirect } from "react-router";
// import { User } from '@accounts/types';

function changePassword(oldPassword: string, newPassword: string) {
  try {
    passwordClient.changePassword(oldPassword, newPassword);
  } catch (err) {
    console.log(err);
  }
}

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

class AccountSettings extends React.Component<any, State> {
  constructor() {
    super({});

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

  handleTabChange(_event: React.ChangeEvent<unknown>, newValue: number) {
    this.setState(() => ({
      selectedTab: newValue,
    }));
  }

  setDetails(username: string, email: string) {
    this.setState(() => ({
      gotUser: UserStatus.LOGGED_IN,
      username: username,
      email: email,
    }));
  }

  handleLoggedOut() {
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
        {this.state.selectedTab === 3 &&
          changePassword("JonsPassword123%%", "JonsNewPassword123%%")}
      </Container>
    );
  }
}

export default AccountSettings;
