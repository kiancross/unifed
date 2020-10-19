#
# CS3099 Group A3
# Kian Cross <kc204@st-andrews.ac.uk>
#

FROM node:12-alpine
WORKDIR /usr/src/unifed
COPY package.json .
RUN npm install
ADD . /usr/src/unifed
RUN npm build
CMD [ "npm", "start" ]
EXPOSE 8080
