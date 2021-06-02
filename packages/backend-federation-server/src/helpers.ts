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

import { Request } from "express";
import { ValidationError } from "class-validator";
import { DocumentType } from "@typegoose/typegoose";
import {
  Community,
  CommunityModel,
  Post,
  PostModel,
  getValidationMessage,
} from "@unifed/backend-core";
import { ResponseError } from "./response-error";

/**
 * Error thrown if a parameter is invalid.
 *
 * @internal
 */
export class ParamError extends ResponseError {
  /**
   * @param value  The value of the parameter.
   * @param name  The name of the parameter.
   * @param message  An optional error message to include.
   */
  constructor(value: unknown, name: string, message?: string) {
    let error = `${name}: Invalid value '${value}'`;
    if (message) {
      error += ` (${message})`;
    }
    super(400, error);
  }
}

/**
 * Processes parameters from a request.
 *
 * @param params  The parameters to process.
 * @param name  Name of the parameter to process.
 * @param processor The processor function.
 *
 * @typeParam T  The type of the parsed value from the parameter.
 *
 * @returns The parsed value.
 *
 * @internal
 */
export async function processParam<T>(
  params: Request["query"],
  name: string,
  processor: (value: string, name: string) => Promise<T | undefined> | T | undefined,
): Promise<T | undefined> {
  const value = params[name];

  if (value) {
    if (typeof value === "string") {
      return await processor(value, name);
    } else {
      throw new ParamError(value, name);
    }
  } else {
    return undefined;
  }
}

/**
 * Gets a community from the database or throws
 * an error.
 *
 * @param id  ID of the community to fetch.
 * @param code  The HTTP error code to throw.
 *
 * @returns The retrieved community.
 *
 * @internal
 */
export async function getCommunityOrThrow(
  id: string,
  code: number,
): Promise<DocumentType<Community>> {
  const community = await CommunityModel.findById(id);

  if (community === null) {
    throw new ResponseError(code, `Community not found: '${id}'`);
  }

  return community;
}

/**
 * Gets a post from the database or throws
 * an error.
 *
 * @param id  ID of the post to fetch.
 * @param code  The HTTP error code to throw.
 *
 * @returns The retrieved community.
 *
 * @internal
 */
export async function getPostOrThrow(id: string, code: number): Promise<DocumentType<Post>> {
  const post = await PostModel.findById(id);

  if (post === null) {
    throw new ResponseError(code, `Post not found: '${id}'`);
  }

  return post;
}

/**
 * Throws an error if the given value contains any
 * validation errors.
 *
 * @param errors  The value to check for errors.
 *
 * @internal
 */
export function throwValidationError(errors: ValidationError[]): void {
  const title = "Validation failed";

  const message = getValidationMessage(errors);

  if (message) {
    throw new ResponseError(400, title, message);
  }
}
