# @unifed/frontend

This package contains the frontend code for the application. It is written with React, using
GraphQL for communication with the backend.

The main two directories in this package are components and pages, both located in the src directory. There are also tests in each component or page directory that can be run to ensure the components work before changes to the code are merged into master. 

## Components

This directory contains the different components that we have created for the application. They are used to break pages into smaller parts and improve code reusability. 

## Pages

This directory contains the different pages that users see when they are on the application. Each of them map to urls that are defined in the 'App' component. They make use of different components from the 'components' folder to create a page that the user can interact with.

## App

This is located in the components directory and is the main entry point for the frontend of the application. It takes care of url routing and changes to the state of the whole application, such as whether the user is logged in and whether it is in dark mode.