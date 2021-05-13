/*
 * Copyright (C) 2020 Kian Cross
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

/**
 * Validates that the given username/ID meets the
 * validation requirements:
 *
 *  - At least 1 character.
 *  - No more than 24 characters.
 *  - Only contains alphanumeric characters, dashes
 *    and underscores.
 *
 * This function is used for usernames/IDs belonging
 * to both users and communities.
 *
 * @param username  A username/ID to validate.
 */
export const validateUsername = (username: string): boolean => {
  return /^[a-zA-Z0-9-_]{1,24}$/.test(username);
};
