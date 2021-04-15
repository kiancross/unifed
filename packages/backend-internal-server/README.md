# @unifed/backend-internal-server

This package implements the GraphQL server, which
communicates with the frontend of the application.

This is where user authentication is handled. 

## Resolvers

This directory contains the API calls provided to allow the frontend and backend
to communicate.

## Services

This directory contains more atomic functions that can be used from within the 
resolvers directory. The functions in Services mostly deal with
manipulating the database.
