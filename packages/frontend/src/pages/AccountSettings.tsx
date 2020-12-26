/*
 * CS3099 Group A3
 */

import React from "react";
import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import AccountTab from "../components/AccountTab";
import ProfileTab from "../components/ProfileTab";
import { Redirect } from "react-router";
import { gql } from "@apollo/client";
import { apolloClient } from "../utils/apollo-client";

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

const GET_USER = {
  query: gql`
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
  `,
};

class AccountSettings extends React.Component<unknown, State> {
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
    apolloClient.query(GET_USER).then((res) => {
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

export default AccountSettings;
