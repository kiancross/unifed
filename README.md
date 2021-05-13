# Unifed

[![Continuous Integration](https://github.com/kiancross/unifed/actions/workflows/continuous-integration.yml/badge.svg?event=push)](https://github.com/kiancross/unifed/actions/workflows/continuous-integration.yml)
[![codecov](https://codecov.io/gh/kiancross/unifed/branch/master/graph/badge.svg?token=FI52RC1RQV)](https://codecov.io/gh/kiancross/unifed)

Unifed is a federated social networking site, targetted towards
universities.

The application was developed for a Junior Honours project at the
University of St Andrews.

There is no publicly hosted example of the application, however
a local installation can be done quickly be following the
instructions [here](#installation). Alternatively, screenshots
are available in the [user manual](#users).

## Contents

 * [Installation](#installation)
   * [Step 1 - Clone the repository](#step-1---clone-the-repository)
   * [Step 2 - Setup Node.js](#step-2---setup-nodejs)
   * [Step 3 - Install yarn](#step-3---install-yarn)
   * [Step 4 - Setup a container service](#step-4---setup-a-container-service)
   * [Step 5 - Install dependencies](#step-5---install-dependencies)
   * [Step 6 - Finish](#step-6---finish)
 * [Commands](#commands)
 * [Repository Layout](#repository-layout)
   * [Configuration Files](#configuration-files)
 * [Development Tools](#development-tools)
 * [Containers](#containers)
 * [Continuous Integration](#continuous-integration)
 * [Contributing](#contributing)
 * [Documentation](#documentation)
   * [Users](#users)
   * [Developers](#developers)
   * [Protocol](#protocol)

## Installation

Unifed uses containers to make installation easy.

The software stack is compatible with Linux, Mac, and Windows.

### Step 1 - Clone the repository
```console
$ git clone git@github.com:kiancross/unifed.git
```

### Step 2 - Setup Node.js

Follow the instructions [here](https://nodejs.org/en/download/).
Version 12 is the recommended choice.

### Step 3 - Install yarn
```console
$ https://yarnpkg.com/configuration/yarnrc npm install -g yarn
```

### Step 4 - Setup a container service

Both Docker and Podman work, although we recommend Docker. If using Podman,
ensure it is v3.0.0 or above.

Installation instructions for Docker can be found [here](https://docs.docker.com/get-docker/).
Ensure that [Docker Compose](https://docs.docker.com/compose/) is also installed.

### Step 5 - Install dependencies
```console
$ yarn install
```

### Step 6 - Finish
Run `yarn container:start`.

After a couple of minutes, you will be able to access the
application at `http://localhost:8080`.

## Commands

All commands are run through `yarn`, e.g. `yarn build`.

The following commands are available in both the package
directories and the root directory (which runs them for
every package):

|Command|Description|
|-------|-----------|
| `build` | Build the package. |
| `test` | Run the tests. |
| `lint` | Check the code style. |
| `fix` | Fix the code style. |
| `clean` | Clean all build files. |

The following commands are only available in the root directory:

|Command|Description|
|-------|-----------|
| `checks` | Run all the checks needed for a successful pull request. |
| `dev-docs` | Clean all build files. |
| `container:start` | Start the containers. |
| `container:stop` | Stop the containers. |
| `container:restart` | Restart the containers. |
| `container:reset` | Reset the containers and their data files. |
| `container:logs` | Get the containers' log output. |
| `container:devdb` | Install the development database. |
| `container:train:build` | Build the machine learning training container. |
| `container:train` | Start training the machine learning models using the GPU accelerated container. |

## Repository Layout

The following directories exist at the base of the
repository.

|Directory|Description|
|---------|-----------|
| `configs` | Contains most configuration files. |
| `docs` | Contains documentation. |
| `packages` | Contains the source code for the application. |
| `scripts` | Contains development scripts. |

The `packages` directory contains the source code, separated
into distinct packages. Descriptions for each of these packages
are contained in `README` files within each package.

More information about `docs` is in the [documentation][#documentation]
section.

### Configuration Files

Some configuration files are located in the root directory.
These are described below.

|Name|Description|
|----|-----------|
| `.codecov.yml` | Configuration file for [Codecov](https://codecov.io/). See [here](https://docs.codecov.io/docs/codecov-yaml). |
| `.dockerignore` | Files to be ignored by Docker. See [here](https://docs.docker.com/engine/reference/builder/#dockerignore-file). |
| `.editorconfig` | Configuration file used by IDEs. See [here](https://editorconfig.org/). |
| `.gitattributes` | See [here](https://github.com/github/linguist/blob/master/docs/overrides.md) for how we are using this. |
| `.github/dependabot.yml` | Configuration file for Dependabot. See [here](https://docs.github.com/en/code-security/supply-chain-security/configuration-options-for-dependency-updates). |
| `.gitignore` | See [here](https://git-scm.com/docs/gitignore). |
| `package.json` | See [here](https://yarnpkg.com/configuration/manifest). |
| `tsconfig.json` | Contains project references to the packages included in the documentation. This is a 'pseudo' TypeScript configuration. |
| `typedoc.js` | See [here](https://typedoc.org/guides/options/). |
| `.vim` | Contains Vim editor configurations. |
| `.vscode` | Contains Visual Studio Code editor configurations. |
| `.yarn` | Contains Yarn binaries. |
| `yarn.lock` | Yarn lock file, used to keep development environments synchronised. |
| `.yarnrc.yml` | Configuration file for Yarn. See [here](https://yarnpkg.com/configuration/yarnrc). |

The remaining configuration files are located in the `configs`
directory. These are described below.

|Name|Description|
|----|-----------|
| `backend-federation.dockerfile` | Dockerfile to create the container for the `backend-federation-server`. |
| `backend-internal.dockerfile` | Dockerfile to create the container for the `backend-internal-server`. |
| `backend-ml.dockerfile` | Dockerfile to create the container for training machine learning models. |
| `config.env` | Configuration values used for the application. These are passed to the containers. |
| `docker-compose.yml` | Orchestration file for Docker Compose. See [here](https://docs.docker.com/compose/compose-file/). |
| `eslintignore` | Files to be ignored by ESLint. See [here](https://eslint.org/docs/user-guide/configuring/ignoring-code#the-eslintignore-file). |
| `eslintrc-non-react.json` | ESLint configuration file for all but the `frontend` package. See [here](https://eslint.org/docs/user-guide/configuring/ignoring-code#the-eslintignore-file). |
| `frontend.dockerfile` | Dockerfile to create the container for the `frontend`. This is only needed for development, as the frontend is static. |
| `kube-deployment.yml` | Orchestration file for Kubernetes, which is used by Podman. See [here](https://kubernetes.io/docs/concepts/overview/working-with-objects/). |
| `mongo-dev.js` | Development database to easily add default entities to MongoDB. |
| `mongo-init.js` | Script to initialise MongoDB. |
| `nginx.dev.conf` | NGINX configuration file used for development. See [here](https://nginx.org/en/docs/). |
| `nycrc.yaml` | Configuration file for IstanbulJS. See [here](https://github.com/istanbuljs/nyc#configuring-nyc). |
| `prettierrc.yaml` | Configuration file for Prettier. See [here](https://prettier.io/docs/en/configuration.html). |

Some of the above configuration files are symbolically linked to by
packages.

## Development Tools
We use a variety of tools to assist with development.

|Name|Description|
|----|-----------|
|Docker| Used for orchestrating containers.|
|ESLint| Used for detecting potential problems with code. |
|Podman| Used for orchestrating containers.|
|Prettier| Used for checking and fixing code formatting. |
|IstanbulJS| Used for generating test coverage reports. |
|Yarn| Used for managing npm packages. |

## Containers
We use Docker and Podman to orchestrate containers. Containers are
an easy way to allow the application to be run on multiple platforms,
with minimal configuration.

Multiple containers are run in a cluster. The only exposed container
is the NGINX container, which proxies requests to the internal server,
federation server and frontend (which simply serves static files).
NGINX binds to port `8080`.

The database inspection container (Mongo Express) is also exposed,
however this is only use for development. This is on port `8081`.

The final container is the MongoDB container. This is only accessible
to the internal and federation servers and not exposed outside of the
cluster.

Both the `kube-deployment.yml` and `docker-compose.yml` files are
essentially identical. Ideally, there would be a single source of
truth, however there is no good tool for converting one into another,
therefore we must maintain both. We tried tools like
[`podman-compose`](https://github.com/containers/podman-compose),
but they were buggy.

## Continuous Integration
On each pull request, automated tests are run. These must all pass before
the pull request may be merged.

We use [Codecov](https://codecov.io/) to generate a test coverage report. In
order to access the report, you should log into Codecov using your GitHub
account. Codecov automatically comments a summary of the coverage report
to each pull request.

GitHub actions are used for running automated tests. See `.github/workflows`
for the configuration files.

## Contributing

The general workflow for fixing a bug/adding a feature should be:

  1) Get the latest `master` branch: `git pull master`.
  2) Fork from `master` with a suitable branch name: `git checkout -b <branch_name>`.
  3) Make some changes.
  4) Run `yarn checks` to ensure all tests pass. Ensure that test coverage is adequate.
  5) Commit the changes to the new branch.
  6) Push to the remote: `git push origin <branch_name>`.
  7) Access the GitHub web-interface and create a pull request to `master`.
  8) Make sure the automated tests pass and then request someone to review.
  9) Once reviewed, the changes can be merged. Write a good commit message.

## Documentation

Unifed is extensively documented, for both users and
developers.

### Users

The user manual can be found [here](https://kiancross.github.io/unifed/).

The user manual is built using Jekyll. Ruby must be installed,
then you can follow the quick-start instructions
[here](https://jekyllrb.com/). In short, once Jekyll is
installed, you can run `bundle exec Jekyll serve` in the
`docs` directory to build the user manual.


### Developers

Developer documentation can be found [here](https://kiancross.github.io/unifed/developers/).
Docker
The developer documentation consists of this `README` and
extensive API documentation. Clicking the package names
on the right hand side of the documentation will take you
to the API documentation for that particular package.
A description of the package is also available after clicking
it. Items marked with `internal` are not exported from the
package.

The developer documentation is built using `yarn dev-docs`,
which invokes the `typedoc` command.

### Protocol

The protocol we developed to allow communication between federated
instances can be found [here](https://github.com/kiancross/cs3099a-specification),
with a corresponding website available [here](https://kiancross.github.io/cs3099a-specification/).
