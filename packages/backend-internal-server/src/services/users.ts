/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { RemoteReference, UserModel } from "@unifed/backend-core";

@Service()
export class UsersService {
  async updateProfile(id: string, profile: { name: string }): Promise<boolean> {
    await UserModel.updateOne({ _id: id }, { $set: { profile } });
    return true;
  }

  async subscribe(u_id: string, host: string, c_id: string): Promise<boolean> {
    const community: RemoteReference = new RemoteReference();
    community.id = c_id;
    community.host = host;
    if (await UserModel.exists({ _id: u_id, subscriptions: community })) return true;
    return (
      (await UserModel.findByIdAndUpdate({ _id: u_id }, { $push: { subscriptions: community } })) !=
      null
    );
  }

  async unsubscribe(u_id: string, host: string, c_id: string): Promise<boolean> {
    const community: RemoteReference = new RemoteReference();
    community.id = c_id;
    community.host = host;
    if (await UserModel.exists({ _id: u_id, subscriptions: community })) {
      return (
        (await UserModel.findByIdAndUpdate(
          { _id: u_id },
          { $pull: { subscriptions: community } },
        )) != null
      );
    }
    return true;
  }

  async getSubscriptions(id: string): Promise<RemoteReference[]> {
    const user = await UserModel.findOne({ _id: id }, "subscriptions").exec();
    if (!user) return [];
    return user?.subscriptions;
  }
}
