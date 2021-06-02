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

import { internet, name } from "faker";
import { v4 as uuid } from "uuid";
import { User, UserProfile } from "@unifed/backend-core";

/**
 * Generates a test user with random attributes (id, username, name).
 */
export const generateUser = (): User => {
  const user = new User();
  user.id = uuid();
  user.username = internet.userName();

  user.profile = new UserProfile();
  user.profile.name = `${name.firstName()} ${name.lastName()}`;

  return user;
};
