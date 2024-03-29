/*
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Robert Mardall
 * Copyright (C) 2021 Lewis Mazzei
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

import React, { useState, useContext, ReactElement } from "react";
import { AppBar, Card, Container, Tab, Tabs } from "@material-ui/core";

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
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useContext(UserContext);
  const handleTabChange = (_event: React.ChangeEvent<unknown>, newValue: number): void => {
    setSelectedTab(newValue);
  };
  if (!user.details) {
    user.refetch();
    return <div />;
  }

  return (
    <Container style={{ paddingTop: "1.5rem" }} maxWidth="sm">
      <Card>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="account settings tabs">
            <Tab label="ACCOUNT" />
            <Tab label="PROFILE" />
          </Tabs>
        </AppBar>
        {selectedTab === 0 && (
          <AccountTab username={user.details.username} email={user.details.emails[0].address} />
        )}
        {selectedTab === 1 && <ProfileTab name={user.details.profile.name} />}
      </Card>
    </Container>
  );
}
