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

db.users.insertOne({
    _id: 'e815d2f7-3c75-4a85-bd65-17a6fcd65abe',
    profile: {
        name: 'Allan'
    },
    services: {
        password: {
            bcrypt: '$2a$10$PPH15K41iW0gkxABy1h1eunruXn68neZtEjJCnJNwFlO1fCKzxB06'
        }
    },
    createdAt: 1605191419601,
    updatedAt: 1605191419601,
    username: 'allan1',
    emails: [
        {
            address: 'allan1@someemail.com',
            verified: true
        }
    ]
})
