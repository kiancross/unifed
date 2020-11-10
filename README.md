# Unifed
  * [Useful Commands](#useful-commands)
    * [`make`](#make)
    * [`yarn`](#yarn)
  * [Contributing](#contributing)
  * [Workflows](#workflows)
  * [Development Setup](#development-setup)
    * [Step 1 - Setup Node.js](#step-1---setup-nodejs)
    * [Step 2 - Install `yarn`](#step-2---install-yarn)
    * [Step 3 - Setup a Container Service](#step-3---setup-a-container-service)
    * [Step 4 - Install Dependencies](#step-4---install-dependencies)
    * [Step 5 - Finish](#step-5---finish)
  * [Synchronisation to School's GitLab](#synchronisation-to-schools-gitlab)



## Useful Commands
### `make`
  * `make start` - start all of the containers.
  * `make stop` - stop all of the containers.
  * `make reset` - reset persistent storage for the containers.
  * `make restart` - run `make stop` then `make start`.
  * `make logs` - view the logs for the Node.js application.
  * `make test` - run both the frontend and backend unit tests.
  * `make lint` - run both the frontend and backend code style checks.
  * `make build` - build both the frontend and backend code.
  * `make checks` - run the `test`, `lint` and `build` targets.
  * `make clean` - remove all build files.
  * `make clean-all` - remove all build files and dependencies.
  * `make coverage` - generate coverage report (output to `./coverage`).

### `yarn`
The `yarn` commands available within both the `frontend` and `backend`
directories are:
  * `yarn start` - start the development server.
  * `yarn build` - build a production version.
  * `yarn test:unit` - run unit tests.
  * `yarn test:integration` - run e2e/integration tests (note that the
    application must have been started on localhost:8080).
  * `yarn lint` - check code style.
  * `yarn clean` - remove and build files.
  * `yarn fix` - fix any easily fixable issues with code style.
  
The `backend` has an additional `watch` command that is the same
as `start`, but automatically reloads if it detects changes to
the source code. The `start` command for `frontend` does this
by default.

The `shared` directory does not have the `watch` or `start` commands.

### Testing
If you are having trouble with `yarn test:integration` in the `frontend`
package then try the following docker command to run Cypress:
```
docker run -it -v $PWD:/e2e -w /e2e --entrypoint=cypress --net=host cypress/included:5.5.0 run --project packages/frontend
```
  

## Contributing
The general workflow for fixing a bug/adding a feature should be:
  1) Get the latest `master` branch: `git pull master`.
  2) Fork from `master` with a suitable branch name: `git checkout -b <branch_name>`.
  3) Make some changes.
  4) Run `make checks` to ensure all tests pass. Ensure that test coverage is adequate.
  5) Commit the changes to the new branch.
  6) Push to remote: `git push origin <branch_name>`.
  7) Access the GitHub web-interface to create a pull request to `master`.
  8) Make sure the automated tests pass and then request someone to review.
  9) Once reviewed, changes can be merged.


## Workflows
There are numerous ways you can work on the project. The easiest is probably
to use the containers that have been setup. When using the containers,
updates to your code will be reflected live. However, when adding new
dependencies, you must reload the containers (`make restart`).

Alternatively, you can setup your own development environment and run
everything locally (i.e. setup a MongoDB instance yourself).



## Development Setup
If on the School's network, you must use an actual PC, not one of the 
host servers.

### Step 1 - Setup Node.js

On the lab machines, follow the instructions on the School's Wiki [here][school_node_setup].

On your own machine, follow the instructions [here][official_node_setup].

### Step 2 - Install `yarn`

`npm install -g yarn`

### Step 3 - Setup a Container Service

On the lab machines we will use Podman. This *should* just work, however at the moment,
due to a bug in the version of Podman the lab machines use, it does not. To fix it, you
can run the following command, which will update your version of Podman:
```bash
bash <(curl -s https://gist.githubusercontent.com/kiancross/08756b745c79368373130c4430cfdd99/raw/a7c2ebb366c2942fda68a15af75b532013a7dc48/update-podman.sh)
```

On your own machine Docker is likely easier. Installation instructions can be
found [here][docker_installation].

### Step 4 - Install Dependencies

Run `yarn install` in both the `frontend` and `backend` directories.

### Step 5 - Finish

Run `make start` and see if the container service starts.

If you are running this on a School machine, you need to setup a SOCKS proxy.
Instructions can be found [here][school_socks] and [here][digital_ocean_socks].



## Synchronisation to School's GitLab

Code pushed to this repository is mirrored to the School's GitLab service at 6am
every morning.



[school_node_setup]: https://systems.wiki.cs.st-andrews.ac.uk/index.php/Using_Node.js_on_the_host_servers#From_the_64-bit_Linux_binary_distribution
[official_node_setup]: https://nodejs.org/en/download/
[docker_installation]: https://docs.docker.com/get-docker/
[school_socks]: https://systems.wiki.cs.st-andrews.ac.uk/index.php/Working_remotely#SOCKS_proxy
[digital_ocean_socks]: https://www.digitalocean.com/community/tutorials/how-to-route-web-traffic-securely-without-a-vpn-using-a-socks-tunnel
