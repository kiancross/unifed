/*
 * Copyright (C) 2020 Kian Cross
 * Copyright (C) 2020 Allan Mathew Chacko
 * Copyright (C) 2020 Robert Mardall
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

db.createUser({
  user: "user",
  pwd: "pass",
  roles:[{
    role: "readWrite",
    db: "unifed"
  }]
});

db.communities.insert({
  _id: "all",
  title: "All",
  description: "Home page"
});
