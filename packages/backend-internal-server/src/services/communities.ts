/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { CommunityModel } from "@unifed/backend-core";
import { CommunitiesFederationService } from "@unifed/backend-federation-client";

@Service()
export class CommunitiesService extends CommunitiesFederationService {
  async create(username: string, id: string, name: string, description: string): Promise<string> {
    await CommunityModel.create({
      _id: id,
      name,
      description,
      admins: [
        {
          id: username,
          host: "this",
        },
      ],
    });
    return id;
  }
}
