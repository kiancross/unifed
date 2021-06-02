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

FROM nvcr.io/nvidia/cuda:10.0-cudnn7-runtime-ubuntu18.04
WORKDIR /usr/src/unifed

RUN adduser --uid 21903 --gecos "" --disabled-password kc204

COPY yarn.lock .
COPY .yarnrc.yml .
ADD .yarn .yarn
COPY package.json .
COPY packages/backend-ml/package.json packages/backend-ml/package.json

RUN apt-get update
RUN apt-get install -y curl tar
RUN curl -sL https://nodejs.org/download/release/v12.6.0/node-v12.6.0-linux-x64.tar.gz | tar -C / --strip-components=1 -kxzf -
RUN npm install -g yarn

RUN yarn workspaces focus @unifed/backend-ml
ADD . .

CMD [ "yarn", "workspace", "@unifed/backend-ml", "train", "+" ]
