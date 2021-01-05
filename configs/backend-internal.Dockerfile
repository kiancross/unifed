#
# CS3099 Group A3
#

FROM node:12-alpine
WORKDIR /usr/src/unifed

COPY yarn.lock .
COPY .yarnrc.yml .
ADD .yarn .yarn
COPY package.json .
COPY packages/shared/package.json packages/shared/package.json
COPY packages/backend-core/package.json packages/backend-core/package.json
COPY packages/backend-federation-client/package.json packages/backend-federation-client/package.json
COPY packages/backend-internal-server/package.json packages/backend-internal-server/package.json

RUN yarn workspaces focus @unifed/backend-internal-server
ADD . .

CMD [ "yarn", "workspace", "@unifed/backend-internal-server", "start:watch" ]
EXPOSE 8080
