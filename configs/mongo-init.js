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

db.posts.insertOne(
    {
        _id: '06752e4c-49ba-4887-af00-4176aff93286',
        title: 'Test Title',
        body: 'Test Post',
        contentType: 'markdown',
        author: {
            id: 'allan1',
            host: 'localhost:8080'
        },
        community: 'all',
        createdAt: ISODate('2020-11-13T12:02:34.602Z'),
        updatedAt: ISODate('2020-11-13T12:02:34.602Z'),
        __v: 0
    }
)
