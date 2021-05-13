/*
 * Copyright (C) 2021 Kian Cross
 * Copyright (C) 2021 Robert Mardall
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

import { ReactElement } from "react";
import { LogoTemplate, ButtonLink } from "../../components";
import { RegistrationCard } from "./RegistrationCard";

/**
 * Allows a user to register for the application.
 *
 * Outline:
 *
 *  - Displays the logo of the app.
 *
 *  - Displays the [[`RegistrationCard`]].
 *
 *  - Allows the user to login if they already have an account by clicking the 'Already a user? Login' button.
 *
 * @internal
 */
export function RegistrationPage(): ReactElement {
  return (
    <LogoTemplate>
      <RegistrationCard />
      <ButtonLink
        to="/login"
        fullWidth
        color="primary"
        variant="contained"
        style={{ marginTop: "16px" }}
      >
        Already a user? Login
      </ButtonLink>
    </LogoTemplate>
  );
}
