/*
 * CS3099 Group A3
 */

const databaseNames = ["unifed-internal", "unifed-federation"];

databaseNames.forEach((name) => {
  db.getSiblingDB(name).createUser({
    user: "user",
    pwd: "pass",
    roles:[{
      role: "readWrite",
      db: name
    }]
  });
});
