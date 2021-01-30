#
# CS3099 Group A3
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
