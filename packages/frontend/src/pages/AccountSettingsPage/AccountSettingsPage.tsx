/*
 * CS3099 Group A3
 */

import React, { useState, useContext, ReactElement } from "react";
import { Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

import { UserContext } from "../../contexts";
import { AccountTab } from "./AccountTab";
import { ProfileTab } from "./ProfileTab";

/**
 * Allows users to view and edit their account details.
 *
 * Outline:
 *
 *  - Users can edit their name, username and password.
 *
 *  - Users can toggle between their account information (username, email and
 *    password) and their profile information (name).
 *
 * @internal
 */
export function AccountSettingsPage(): ReactElement {
  const [selectedTab, setSelectedTab] = useState("1");
  const user = useContext(UserContext);
  const handleTabChange = (_event: React.ChangeEvent<unknown>, newValue: string): void => {
    setSelectedTab(newValue);
  };
  if (!user.details) {
    user.refetch();
    return <div />;
  }

  return (
    <Container style={{ paddingTop: "1.5rem" }} maxWidth="sm">
      <TabContext value={selectedTab}>
        <AppBar position="static">
          <TabList onChange={handleTabChange} aria-label="account settings tabs">
            <Tab label="ACCOUNT" value="1" />
            <Tab label="PROFILE" value="2" />
          </TabList>
        </AppBar>
        <TabPanel value="1">
          Account
          <AccountTab username={user.details.username} email={user.details.emails[0].address} />
        </TabPanel>
        <TabPanel value="2">
          Profile
          <ProfileTab name={user.details.profile.name} />
        </TabPanel>
      </TabContext>
    </Container>
  );
}
