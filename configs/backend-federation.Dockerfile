#
# CS3099 Group A3
#

FROM node:12-alpine
WORKDIR /usr/src/unifed

COPY yarn.lock .
COPY .yarnrc.yml .
ADD .yarn .yarn
COPY package.json .
COPY packages/backend-core/package.json packages/backend-core/package.json
COPY packages/backend-federation-server/package.json packages/backend-federation-server/package.json

RUN yarn workspaces focus unifed-backend-federation-server

ADD . .

RUN yarn workspaces foreach -vpt --include unifed-backend-core --include unifed-backend-federation-server run build

CMD [ "yarn", "workspace", "unifed-backend-federation-server", "start:watch" ]
EXPOSE 8080
