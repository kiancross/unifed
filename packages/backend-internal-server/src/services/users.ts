/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { RemoteReference, UserModel, UserProfile } from "@unifed/backend-core";

@Service()
export class UsersService {
  async updateProfile(id: string, name: string): Promise<boolean> {
    const profile = new UserProfile();
    profile.name = name;

    await UserModel.updateOne({ _id: id }, { $set: { profile: profile } });
    return true;
  }

  async subscribe(userId: string, host: string, communityId: string): Promise<boolean> {
    const community: RemoteReference = new RemoteReference();
    community.id = communityId;
    community.host = host;

    if (await UserModel.exists({ _id: userId, subscriptions: { $elemMatch: community } })) {
      return true;
    }

    return (
      (await UserModel.findByIdAndUpdate(
        { _id: userId },
        { $push: { subscriptions: community } },
      )) != null
    );
  }

  async unsubscribe(userId: string, host: string, communityId: string): Promise<boolean> {
    const community: RemoteReference = new RemoteReference();
    community.id = communityId;
    community.host = host;

    if (await UserModel.exists({ _id: userId, subscriptions: { $elemMatch: community } })) {
      return (
        (await UserModel.findByIdAndUpdate(
          { _id: userId },
          { $pull: { subscriptions: community } },
        )) != null
      );
    }

    return true;
  }

  async getSubscriptions(id: string): Promise<RemoteReference[]> {
    const user = await UserModel.findOne({ _id: id }, "subscriptions").lean();

    if (!user || !user.subscriptions) return [];

    return plainToClass(RemoteReference, user.subscriptions);
  }

  async getAllPosts(username: string): Promise<RemoteReference[]> {
    const user = await UserModel.findOne({ username: username }, "posts").lean();

    if (!user || !user.posts) return [];

    return plainToClass(RemoteReference, user.posts);
  }
}
