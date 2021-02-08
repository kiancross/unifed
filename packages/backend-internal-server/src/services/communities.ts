/*
 * CS3099 Group A3
 */

import { Service } from "typedi";
import { CommunitiesFederationService } from "@unifed/backend-federation-client";

@Service()
export class CommunitiesService extends CommunitiesFederationService {}
