/*
 * CS3099 Group A3
 */

import React, { useState, useContext } from "react";
import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import AccountTab from "./AccountTab";
import ProfileTab from "./ProfileTab";
import { UserContext } from "../../contexts/user";

const AccountSettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useContext(UserContext);
  const handleTabChange = (_event: React.ChangeEvent<unknown>, newValue: number): void => {
    setSelectedTab(newValue);
  };
  if (!user.details) {
    user.refetch();
    console.log(user.details);
    return <div />;
  }

  console.log(user.details);

  return (
    <Container style={{ paddingTop: "1.5rem" }} maxWidth="sm">
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="ACCOUNT" />
          <Tab label="PROFILE" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (
        <AccountTab username={user.details.username} email={user.details.emails[0].address} />
      )}
      {selectedTab === 1 && <ProfileTab name={user.details.profile.name} />}
    </Container>
  );
};

export default AccountSettingsPage;
