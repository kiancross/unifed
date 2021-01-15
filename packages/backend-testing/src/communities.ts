/*
 * CS3099 Group A3
 */

import { lorem, random } from "faker";
import { Community } from "@unifed/backend-core";

export const generateCommunity = (): Community => {
  const community = new Community();
  community.id = random.word();
  community.title = lorem.words();
  community.description = lorem.sentence();

  return community;
};

export const generateCommunities = (n: number): Community[] => {
  const communities = [];

  for (let i = 0; i < n; i++) {
    communities.push(generateCommunity());
  }

  return communities;
};
