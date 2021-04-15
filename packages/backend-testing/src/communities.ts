/*
 * CS3099 Group A3
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
