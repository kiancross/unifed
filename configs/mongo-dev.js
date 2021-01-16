/*
 * CS3099 Group A3
 */

db = db.getSiblingDB("unifed-internal");

db.users.insert({
  _id: "45bc8036-0af7-403b-a174-34dbf735c038",
  profile: {
    name: "Test User"
  },
  services: {
    password: {
      // TestUser123!
      bcrypt: "$2a$10$JS.BlCFZCAXzq72/K6tR6.4PJMieWw9.g3TTe9witH7qBt.e18DPm"
    },
    email: { }
  },
  createdAt: 1610821115974,
  updatedAt: 1610821115974,
  username: "testuser",
  emails: [
    {
      address: "test@unifed.com",
      verified: true
    }
  ]
});
