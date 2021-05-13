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

db = db.getSiblingDB("unifed");

db.users.insert({
  _id: "45bc8036-0af7-403b-a174-34dbf735c038",
  profile: {
    name: "Test User"
  },
  services: {
    password: {
      // TestUser123!
      bcrypt: "$2a$10$JS.BlCFZCAXzq72/K6tR6.4PJMieWw9.g3TTe9witH7qBt.e18DPm"
    },
    email: { }
  },
  createdAt: 1610821115974,
  updatedAt: 1610821115974,
  username: "testuser",
  emails: [
    {
      address: "test@unifed.com",
      verified: true
    }
  ]
});
