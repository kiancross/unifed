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

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      UNIFED_SMTP_USERNAME?: string;
      UNIFED_SMTP_PASSWORD?: string;
      UNIFED_SMTP_HOST?: string;
      UNIFED_SMTP_PORT?: string;
      UNIFED_MONGO_HOSTNAME?: string;
      UNIFED_MONGO_PORT?: string;
      UNIFED_MONGO_DATABASE?: string;
      UNIFED_MONGO_USERNAME?: string;
      UNIFED_MONGO_PASSWORD?: string;
      UNIFED_JWT_SECRET?: string;
      UNIFED_INTERNEL_REFERENCE?: string;
      UNIFED_SITE_HOST?: string;
      UNIFED_SITE_PROTOCOL?: string;
      UNIFED_APPLICATION_NAME?: string;
      UNIFED_SERVER_PORT?: string;
      UNIFED_LOG_LEVEL?: string;
      NODE_ENV?: string;
    }
  }
}

export {};
