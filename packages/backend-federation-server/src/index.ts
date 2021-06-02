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

import mongoose from "mongoose";
import { config, logger } from "@unifed/backend-core";
import { app } from "./app";

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true, ignoreUndefined: true };
const mongoUri =
  `mongodb://${config.mongoUsername}:${config.mongoPassword}@` +
  `${config.mongoHostname}:${config.mongoPort}/${config.mongoDatabase}`;

(async () => {
  await mongoose.connect(mongoUri, mongoOptions);

  logger.info("Connected to database");

  app.listen(config.serverPort, () =>
    logger.info(`Server running on http://localhost:${config.serverPort}`),
  );
})();
