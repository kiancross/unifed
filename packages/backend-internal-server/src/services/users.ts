/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { UserModel } from "@unifed/backend-core";

@Service()
export class UsersService {
  async updateProfile(id: string, profile: any): Promise<boolean> {
    await UserModel.updateOne({ _id: id }, { $set: { profile } });
    return true;
  }
}
