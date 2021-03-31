/*
 * CS3099 Group A3
 */

import { useState } from "react";
import { QueueTab } from "./QueueTab";
import { AppBar, Card, Container, Tab, Tabs } from "@material-ui/core";

export const ModerationPage = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (_event: React.ChangeEvent<unknown>, newValue: number): void => {
    setSelectedTab(newValue);
  };
  return (
    <Container style={{ paddingTop: "1.5rem" }} maxWidth="md">
      <Card>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="QUEUE" />
          </Tabs>
        </AppBar>
        {selectedTab === 0 && <QueueTab />}
      </Card>
    </Container>
  );
};
