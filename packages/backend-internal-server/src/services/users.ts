/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { plainToClass } from "class-transformer";
import { RemoteReference, UserModel } from "@unifed/backend-core";

@Service()
export class UsersService {
  async updateProfile(id: string, profile: { name: string }): Promise<boolean> {
    await UserModel.updateOne({ _id: id }, { $set: { profile: profile as any } });
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

    if (!user) return [];

    return plainToClass(RemoteReference, user.subscriptions);
  }
}
