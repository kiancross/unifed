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

FROM node:12-buster
WORKDIR /usr/src/unifed

COPY yarn.lock .
COPY .yarnrc.yml .
ADD .yarn .yarn
COPY package.json .
COPY packages/backend-testing/package.json packages/backend-testing/package.json
COPY packages/backend-ml/package.json packages/backend-ml/package.json
COPY packages/backend-core/package.json packages/backend-core/package.json
COPY packages/backend-federation-server/package.json packages/backend-federation-server/package.json

RUN yarn workspaces focus @unifed/backend-federation-server
ADD . .

CMD [ "yarn", "workspace", "@unifed/backend-federation-server", "start:watch" ]
EXPOSE 8080
