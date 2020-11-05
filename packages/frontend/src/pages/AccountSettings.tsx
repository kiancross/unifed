import React from "react";
import { AppBar, Container, Tab, Tabs } from "@material-ui/core";
import AccountTab from "../components/AccountTab";

const AccountSettings = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (_event: React.ChangeEvent<unknown>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="ACCOUNT" />
          <Tab label="PROFILE" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <AccountTab email="js123@gmail.com" />}
    </Container>
  );
};

export default AccountSettings;
