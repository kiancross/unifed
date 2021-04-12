# @unifed/frontend

This package contains the frontend code for the application. It is written with React, using
GraphQL for communication with the backend.

The main two directories in this package are `components` and `pages`. 

There are also tests (which can be run using `yarn test`) to ensure that
nothing has regressed. 

## Components

This directory contains the different components that we have created for the application. 
They are used to break pages into smaller parts and improve code reusability. 

In particular, these components are reused within various other components or pages.

## Pages

This directory contains the different pages that users can access when they are on the application. 
Each page corresponds to a URL defined in the `App` component. They make use of both components
from the `components` directory and other local components stored with the page, which are only useful
for that particular page.

## App

This is located in the components directory and is the main entry point for the frontend
of the application (it is included by `index.ts`, which bootstraps the application). It takes
care of URL routing and manages the state of the application, such as whether the user
is logged in and whether it is in dark mode.

## Documentation

Further developer documentation for this package is available [here](https://kiancross.github.io/unifed/developers/modules/frontend.html).
