const DELETE_POST_STRING = `
    mutation($id: String!, $host: String!) {
        deletePost(post: {id:$id, host:$host}) {
            Boolean
        }
    }
`;

const EDIT_POST_STRING = `
    mutation
`;

export { DELETE_POST_STRING, EDIT_POST_STRING };
