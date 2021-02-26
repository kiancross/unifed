/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { CommunityModel, RemoteReference } from "@unifed/backend-core";
import { CommunitiesFederationService } from "@unifed/backend-federation-client";

@Service()
export class CommunitiesService extends CommunitiesFederationService {
  async create(username: string, id: string, title: string, description: string): Promise<boolean> {
    const admin = new RemoteReference();
    admin.id = username;
    admin.host = "this";

    await CommunityModel.create({
      _id: id,
      title,
      description,
      admins: [admin],
    });
    return true;
  }
}
