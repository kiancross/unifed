/*
 * CS3099 Group A3
 */

import { CommunityModel } from "../models";
import { logger } from "./logging";

const creators = [
  (async () => {
    await CommunityModel.create({
      _id: "all",
      title: "All",
      description: "Display on a user's home page",
    });
  }),
  
  (async () => {
    await CommunityModel.create({
      _id: "general",
      title: "General Discussion",
      description: "A community for everything!",
    });
  }),
  
  (async () => {
    await CommunityModel.create({
      _id: "elections",
      title: "Elections",
      description: "A community for election discussion.",
    });
  }),
];

export async function createDefaults() {

  for (const creator of creators) {
    try {
      await creator();

    } catch (error) {
    
      if (error.code === 11000) {
        logger.info("Default already exists");

      } else {
        throw error;
      }
    }
  }
}
