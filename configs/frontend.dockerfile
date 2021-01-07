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
COPY packages/frontend/package.json packages/frontend/package.json

RUN yarn workspaces focus @unifed/frontend
ADD . .
RUN yarn workspace @unifed/shared build

ENV CI=true
CMD [ "yarn", "workspace", "@unifed/frontend", "start" ]
EXPOSE 3000
