/*
 * CS3099 Group A3
 */

import { CommunityModel } from "../models";

export async function createDefaults() {
  try {
    await CommunityModel.create({
      _id: "general",
      title: "General Discussion",
      description: "A community for everything!",
    });
    await CommunityModel.create({
      _id: "elections",
      title: "Elections",
      description: "A community for election discussion.",
    });
  } catch {
    console.log("Defaults already created");
  }
}
