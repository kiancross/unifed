#
# Copyright (C) 2021 Kian Cross
#
# This file is part of Unifed.
#
# Unifed is free software: you can redistribute it and/or modify it
# under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Unifed is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with Unifed.  If not, see <https://www.gnu.org/licenses/>.
#

FROM node:12-alpine
WORKDIR /usr/src/unifed

COPY yarn.lock .
COPY .yarnrc.yml .
ADD .yarn .yarn
COPY package.json .
COPY packages/shared/package.json packages/shared/package.json
COPY packages/backend-testing/package.json packages/backend-testing/package.json
COPY packages/backend-core/package.json packages/backend-core/package.json
COPY packages/backend-federation-client/package.json packages/backend-federation-client/package.json
COPY packages/backend-internal-server/package.json packages/backend-internal-server/package.json

RUN yarn workspaces focus @unifed/backend-internal-server
ADD . .

CMD [ "yarn", "workspace", "@unifed/backend-internal-server", "start:watch" ]
EXPOSE 8080
