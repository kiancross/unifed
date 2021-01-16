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

db = db.getSiblingDB("unifed-federation");

db.communities.insert({
  _id: "all",
  title: "All",
  description: "Home page"
});
