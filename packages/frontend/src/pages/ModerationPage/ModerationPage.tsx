/*
 * Copyright (C) 2021 Allan Mathew Chacko
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
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
