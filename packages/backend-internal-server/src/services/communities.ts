/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { CommunityModel } from "@unifed/backend-core";
import { CommunitiesFederationService } from "@unifed/backend-federation-client";

@Service()
export class CommunitiesService extends CommunitiesFederationService {
  async create(user: string, id: string, title: string, description: string): Promise<boolean> {
    await CommunityModel.create({
      _id: id,
      title,
      description,
      admins: [
        {
          id: user,
          host: "this",
        },
      ],
    });
    return true;
  }
}
