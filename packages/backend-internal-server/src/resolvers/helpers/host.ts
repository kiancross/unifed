/*
 * Copyright (C) 2021 Kian Cross
 *
 * This file is part of Unifed.
 *
 * Unifed is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Unifed is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
 */

import { config } from "@unifed/backend-core";

import * as dns from "dns";
import * as ipaddr from "ipaddr.js";

export const localAlias = "this";

export class HostNotSetError extends Error {}

function isLocalAlias(host: string): boolean {
  return host === localAlias;
}

function includesLocalAddress(addresses: string[]): boolean {
  for (const address of addresses) {
    if (!ipaddr.isValid(address)) {
      continue;
    }

    const parsedAddress = ipaddr.parse(address);
    const addressType = parsedAddress.range();

    if (addressType != "unicast") {
      return true;
    }
  }

  return false;
}

async function isHostLocal(host: string): Promise<boolean> {
  const splitHost = host.split(":");
  const hostName = splitHost[0];

  return new Promise((resolve, reject) => {
    dns.resolve(hostName, (error, addresses) => {
      if (error) {
        if (error.code && ["ENOTFOUND", "ESERVFAIL", "ENODATA"].includes(error.code)) {
          addresses = [hostName];
        } else {
          return reject(error);
        }
      }

      return resolve(includesLocalAddress(addresses));
    });
  });
}

export async function normaliseHost(host: string): Promise<string> {
  if (!host) {
    throw new HostNotSetError();
  }

  if (isLocalAlias(host) || (await isHostLocal(host))) {
    return localAlias;
  } else {
    return host;
  }
}

export function getAddressableHost(host: string): string {
  if (!host) {
    throw new HostNotSetError();
  }

  if (isLocalAlias(host)) {
    return config.federationHost;
  } else {
    return host;
  }
}

export async function translateHost(host: string): Promise<string> {
  return getAddressableHost(await normaliseHost(host));
}
