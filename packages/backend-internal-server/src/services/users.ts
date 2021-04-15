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

  /**
   * Allows a user to subscribe to a community. Adds a reference to the subscribed
   * community for the user.
   *
   * @param userId The user subscribing.
   *
   * @param host The host of the community.
   *
   * @param communityId The id of the community on the federated network.
   *
   * @returns True on success.
   *
   * @internal
   */
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

  /**
   * Allows a user to unsubscribe from a community. If there is an existing
   * reference to the community, it is removed.
   *
   * @param userId ID of the user.
   *
   * @param host The server hosting the community.
   *
   * @param communityId The id of the community on the federated network.
   *
   * @returns True on success.
   *
   * @internal
   */
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

  /**
   * Fetches an array of references to the communities a user is subscribed to.
   *
   * @param id ID of the user.
   *
   * @returns Array of subscribed communities. Empty array if the user does not exist.
   *
   * @internal
   */
  async getSubscriptions(id: string): Promise<RemoteReference[]> {
    const user = await UserModel.findOne({ _id: id }, "subscriptions").lean();

    if (!user || !user.subscriptions) return [];

    return plainToClass(RemoteReference, user.subscriptions);
  }

  /**
   * Fetches all the posts made by a user.
   *
   * @param username Username of the user.
   *
   * @returns Array of posts. Empty array if the user does not exist.
   *
   * @internal
   */
  async getAllPosts(username: string): Promise<RemoteReference[]> {
    const user = await UserModel.findOne({ username: username }, "posts").lean();

    if (!user || !user.posts) return [];

    return plainToClass(RemoteReference, user.posts);
  }
}
