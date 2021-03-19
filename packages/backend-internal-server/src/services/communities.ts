/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { Community, CommunityModel, RemoteReference } from "@unifed/backend-core";
import { CommunitiesFederationService } from "@unifed/backend-federation-client";

@Service()
export class CommunitiesService extends CommunitiesFederationService {
  async create(username: string, id: string, title: string, description: string): Promise<boolean> {
    const admin = new RemoteReference();
    admin.id = username;
    admin.host = "this";

    const community = new Community();
    community.id = id;
    community.title = title;
    community.description = description;
    community.admins = [admin];

    await CommunityModel.create(community);
    return true;
  }
}
