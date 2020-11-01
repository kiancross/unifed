#
# CS3099 Group A3
# Kian Cross <kc204@st-andrews.ac.uk>
#

FROM node:12-alpine
WORKDIR /usr/src/unifed
COPY package.json .
COPY yarn.lock .
RUN yarn install
ADD . .
RUN yarn build
ENV CI=true
CMD [ "yarn", "start" ]
EXPOSE 3000
