/*
 * CS3099 Group A3
 */

import React from "react";
import { Redirect } from "react-router";
import { gql } from "@apollo/client";
import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import { apolloClient } from "../../helpers/apollo-client";
import AccountTab from "./AccountTab";
import ProfileTab from "./ProfileTab";

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
  name: string;
}

export const GET_USER = gql`
  query {
    getUser {
      emails {
        address
      }
      username
      profile {
        name
      }
    }
  }
`;

class AccountSettingsPage extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      gotUser: UserStatus.FETCHING,
      selectedTab: 0,
      email: "",
      username: "",
      name: "",
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.setDetails = this.setDetails.bind(this);
  }

  handleTabChange(_event: React.ChangeEvent<unknown>, newValue: number): void {
    this.setState(() => ({
      selectedTab: newValue,
    }));
  }

  setDetails(): void {
    apolloClient.query({ query: GET_USER }).then((res) => {
      const userInfo = res.data.getUser;
      if (userInfo) {
        this.setState(() => ({
          gotUser: UserStatus.LOGGED_IN,
          username: userInfo.username,
          email: userInfo.emails[0].address,
          name: userInfo.profile.name,
        }));
      } else {
        this.setState(() => ({
          gotUser: UserStatus.LOGGED_OUT,
        }));
      }
    });
  }

  render() {
    if (this.state.gotUser === UserStatus.FETCHING) {
      this.setDetails();
    }

    if (this.state.gotUser === UserStatus.LOGGED_OUT) return <Redirect to="/" />;

    return (
      <Container style={{ paddingTop: "1.5rem" }} maxWidth="sm">
        <AppBar position="static">
          <Tabs value={this.state.selectedTab} onChange={this.handleTabChange}>
            <Tab label="ACCOUNT" />
            <Tab label="PROFILE" />
          </Tabs>
        </AppBar>
        {this.state.selectedTab === 0 && (
          <AccountTab username={this.state.username} email={this.state.email} />
        )}
        {this.state.selectedTab === 1 && <ProfileTab name={this.state.name} />}
      </Container>
    );
  }
}

export default AccountSettingsPage;
