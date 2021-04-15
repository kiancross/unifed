/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { QueueTab } from "./QueueTab";
import { AppBar, Card, Container, Tab, Tabs } from "@material-ui/core";

/**
 * Presents moderation features for community administrators.
 *
 * Outline:
 *
 *  - Contains a moderation queue where posts from moderated communities can be reviewed.
 *
 * @internal
 */
export function ModerationPage(): ReactElement {
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
}
