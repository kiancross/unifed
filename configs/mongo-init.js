/*
 * CS3099 Group A3
 */

db.createUser({
  user: "user",
  pwd: "pass",
  roles:[{
    role: "readWrite",
    db: "unifed"
  }]
});

db.communities.insert({
  _id: "all",
  title: "All",
  description: "Home page"
});
