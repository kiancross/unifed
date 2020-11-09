/*
 * CS3099 
 */

const base = {

  version: "3",

  services: {
    mongo: {
      image: "mongo:4",
      restart: "unless-stopped",
      networks: ["database"],
      volumes: [
        "mongo_data:/data/db",
        "./configs/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro"
      ],
      ports: [],
      environment: {
        MONGO_INITDB_ROOT_USERNAME: "${MONGO_ADMIN_USERNAME}",
        MONGO_INITDB_ROOT_PASSWORD: "${MONGO_ADMIN_PASSWORD}",
        MONGO_INITDB_DATABASE: "${MONGO_DATABASE}"
      }
    },
  },

  networks: {
    proxy: {
      driver: "bridge"
    },
    database: {
      driver: "bridge"
    }
  },

  volumes: {
    mongo_data: {}
  }
};

const testEnv = process.env.NODE_ENV === "test";
const devEnv = !testEnv;

if (testEnv) {
  base.services.mongo.ports.push("27017:27017");
}

if (devEnv) {

  base.services.proxy = {
    image: "nginx:stable-alpine",
    restart: "unless-stopped",
    networks: ["proxy"],
    depends_on: ["backend", "frontend"],
    volumes: ["./configs/nginx.dev.conf:/etc/nginx/nginx.conf:ro"],
    ports: ["${BACKEND_PORT}:80"]
  }

  base.services.backend = {
    build: {
      context: ".",
      dockerfile: "Dockerfile.backend"
    },
    restart: "unless-stopped",
    networks: [
      "proxy",
      "database"
    ],
    depends_on: ["mongo"],
    volumes: [
      "./packages/shared/src:/usr/src/unifed/packages/shared/src:ro",
      "./packages/backend/src:/usr/src/unifed/packages/backend/src:ro"
    ],
    environment: {
      SMTP_USERNAME: "${SMTP_USERNAME}",
      SMTP_PASSWORD: "${SMTP_PASSWORD}",
      SMTP_HOST: "${SMTP_HOST}",
      SMTP_PORT: "${SMTP_PORT}",
      MONGO_HOSTNAME: "mongo",
      MONGO_PORT: "27017",
      MONGO_DATABASE: "${MONGO_DATABASE}",
      MONGO_USERNAME: "user",
      MONGO_PASSWORD: "pass",
      JWT_SECRET: "${JWT_SECRET}",
      SITE_URL: "${SITE_URL}",
      APPLICATION_NAME: "${APPLICATION_NAME}",
      NODE_ENV: "$NODE_ENV"
    }
  },

  base.services["mongo-express"] = {
    image: "mongo-express",
    restart: "unless-stopped",
    networks: ["database"],
    ports: ["${MONGO_INSPECT_PORT}:8081"],
    environment: {
      ME_CONFIG_MONGODB_ADMINUSERNAME: "${MONGO_ADMIN_USERNAME}",
      ME_CONFIG_MONGODB_ADMINPASSWORD: "${MONGO_ADMIN_PASSWORD}",
      ME_CONFIG_BASICAUTH_USERNAME: "${MONGO_INSPECT_USERNAME}",
      ME_CONFIG_BASICAUTH_PASSWORD: "${MONGO_INSPECT_PASSWORD}",
      ME_CONFIG_MONGODB_SERVER: "mongo"
    }
  };

  base.services.frontend = {
    build: {
      context: ".",
      dockerfile: "Dockerfile.frontend"
    },
    restart: "unless-stopped",
    networks: ["proxy"],
    volumes: [
      "./packages/shared/src:/usr/src/unifed/packages/shared/src:ro",
      "./packages/frontend/src:/usr/src/unifed/packages/frontend/src:ro"
    ]
  }
}

console.log(JSON.stringify(base, null, 2))