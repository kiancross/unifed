#!/usr/bin/env bash
#
# CS3099 Group A3
#

cat << 'EOF'
version: "3"

services:
  proxy:
    image: nginx:stable-alpine
    restart: unless-stopped
    networks:
      - proxy
    depends_on:
      - backend
EOF
if [[ $NODE_ENV == prod ]]; then
cat << 'EOF'
    volumes:
      - ./nginx.prod.conf:/etc/nginx/nginx.conf:ro
      - ./packages/frontend/build:/var/www/virtual/unifed-frontend:ro
EOF
else
cat << 'EOF'
      - frontend
    volumes:
      - ./nginx.dev.conf:/etc/nginx/nginx.conf:ro
EOF
fi
cat << 'EOF'
    ports:
      - ${BACKEND_PORT}:80

  mongo:
    image: mongo:4
    restart: unless-stopped
    networks:
      - database
    volumes:
      - mongo_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ADMIN_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ADMIN_PASSWORD}
      MONGO_INITDB_DATABASE: ${MONGO_DATABASE}

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    restart: unless-stopped
    networks:
      - proxy
      - database
    depends_on:
      - mongo
    volumes:
      - ./packages/shared/src:/usr/src/unifed/packages/shared/src:ro
      - ./packages/backend/src:/usr/src/unifed/packages/backend/src:ro
    environment:
      SMTP_USERNAME: ${SMTP_USERNAME}
      SMTP_PASSWORD: ${SMTP_PASSWORD}
      SMTP_HOST: ${SMTP_HOST}
      SMTP_PORT: ${SMTP_PORT}
      MONGO_HOSTNAME: mongo
      MONGO_PORT: 27017
      MONGO_DATABASE: ${MONGO_DATABASE}
      MONGO_USERNAME: user
      MONGO_PASSWORD: pass
      JWT_SECRET: ${JWT_SECRET}
      SITE_URL: ${SITE_URL}
      APPLICATION_NAME: ${APPLICATION_NAME}
EOF
cat << EOF
      NODE_ENV: $NODE_ENV
EOF

if [[ $NODE_ENV != prod ]]; then
cat << 'EOF'
  mongo-express:
    image: mongo-express
    restart: unless-stopped
    networks:
      - database
    ports:
      - ${MONGO_INSPECT_PORT}:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: ${MONGO_ADMIN_USERNAME}
      ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_ADMIN_PASSWORD}
      ME_CONFIG_BASICAUTH_USERNAME: ${MONGO_INSPECT_USERNAME} 
      ME_CONFIG_BASICAUTH_PASSWORD: ${MONGO_INSPECT_PASSWORD}
      ME_CONFIG_MONGODB_SERVER: mongo
  
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    restart: unless-stopped
    networks:
      - proxy
    volumes:
      - ./packages/shared/src:/usr/src/unifed/packages/shared/src:ro
      - ./packages/frontend/src:/usr/src/unifed/packages/frontend/src:ro
EOF
fi

cat << 'EOF'
networks:
  proxy:
    driver: bridge
  database:
    driver: bridge

volumes:
  mongo_data:
EOF
