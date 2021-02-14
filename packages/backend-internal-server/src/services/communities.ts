/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { CommunityModel } from "@unifed/backend-core";
import { CommunitiesFederationService } from "@unifed/backend-federation-client";

@Service()
export class CommunitiesService extends CommunitiesFederationService {
  async create(username: string, id: string, title: string, description: string): Promise<Boolean> {
    await CommunityModel.create({
      _id: id,
      title,
      description,
      admins: [
        {
          id: username,
          host: "this",
        },
      ],
    });
    return true;
  }
}
