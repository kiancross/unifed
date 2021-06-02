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

import { lorem, random } from "faker";
import { Community } from "@unifed/backend-core";

/**
 * Creates a new community with random attributes (id, title, description).
 *
 * @returns
 */
export const generateCommunity = (): Community => {
  const community = new Community();
  community.id = random.word();
  community.title = lorem.words();
  community.description = lorem.sentence();

  return community;
};

/**
 * Generates an array of test communities with random attributes.
 *
 * @param n number of new communities to create.
 */
export const generateCommunities = (n: number): Community[] => {
  const communities: Community[] = [];

  for (let i = 0; i < n; i++) {
    const community = generateCommunity();

    if (communities.find((value) => value.id === community.id)) {
      i--;
    } else {
      communities.push(community);
    }
  }

  return communities;
};
