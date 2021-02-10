/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { PostsFederationService } from "@unifed/backend-federation-client";

@Service()
export class PostsService extends PostsFederationService {}
