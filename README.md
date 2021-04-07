# Unifed

[![Continuous Integration](https://github.com/kiancross/unifed/actions/workflows/continuous-integration.yml/badge.svg?event=schedule)](https://github.com/kiancross/unifed/actions/workflows/continuous-integration.yml?query=event%3Aschedule)
[![School GitLab Mirror](https://github.com/kiancross/unifed/workflows/School%20GitLab%20Mirror/badge.svg)](https://github.com/kiancross/unifed/actions?query=workflow%3A%22School+GitLab+Mirror%22)
[![codecov](https://codecov.io/gh/kiancross/unifed/branch/master/graph/badge.svg?token=FI52RC1RQV)](https://codecov.io/gh/kiancross/unifed)

Unifed is a federated social networking site, targetted towards
universities.

The project was developed for a Junior Honours project at the
University of St Andrews.


## Installation

Unifed uses containers to make installation easy.

The software stack is compatible with Linux, Mac, Windows and
both personal computers and the School's lab machines.

*If using the School's computers, you must use a lab machine,
not one of the host servers.*

### Step 1 - Clone the repository
```console
$ git clone git@github.com:kiancross/unifed.git
```

### Step 2 - Setup Node.js
On the lab machines, follow the instructions on the School's wiki
[here](https://systems.wiki.cs.st-andrews.ac.uk/index.php/Using_Node.js_on_the_host_servers#From_the_64-bit_Linux_binary_distribution).

On your own machine, follow the instructions [here](https://nodejs.org/en/download/).

Version 12 is the recomended choice.

### Step 3 - Install yarn
```console
$ npm install -g yarn
```

### Step 4 - Setup a container service
On the lab machines we use Podman. This *should* just work, however
at the moment, due to a bug in the version on the lab machines,
it does not. To fix it, you can run the following command, which
will update your version of Podman:

```console
$ bash <(curl -s https://gist.githubusercontent.com/kiancross/08756b745c79368373130c4430cfdd99/raw/fa6a358d67327ed6f329df9ad0167d000e1492bd/update-podman.sh)
```

On your own machine, Docker is a better choice than Podman. Installation
instructions can be found [here](https://docs.docker.com/get-docker/).

### Step 5 - Install dependencies
```console
$ yarn install
```

### Step 6 - Finish
Run `yarn container:start`.

After a couple of minutes, you will be able to access the
application at `http://localhost:8080`.

If you are running this remotely on a lab machine, you need to
setup a SOCKS proxy to access the application from the browser
on your own machine. Instructions can be found
[here](https://systems.wiki.cs.st-andrews.ac.uk/index.php/Working_remotely#SOCKS_proxy)
and
[here](https://www.digitalocean.com/community/tutorials/how-to-route-web-traffic-securely-without-a-vpn-using-a-socks-tunnel).

TODO TOC

## Commands

All commands are run through `yarn`, e.g. `yarn build`.

The following commands are available in both the package
directories and the root directory (which runs them for
every package):

|Command|Description|
|-------|-----------|
| `build` | Build the package |
| `test` | Run the tests |
| `lint` | Check the code style |
| `fix` | Fix the code style |
| `clean` | Clean all build files |

The following commands are only available in the root directory:

|Command|Description|
|-------|-----------|
| `checks` | Run all the checks needed for a successful pull request |
| `dev-docs` | Clean all build files |
| `container:start` | Start the containers |
| `container:stop` | Stop the containers |
| `container:restart` | Restart the containers |
| `container:reset` | Reset the containers and their data files |
| `container:logs` | Get the containers' log output |
| `container:devdb` | Install the development database |
| `container:train:build` | Build the machine learning training container |
| `container:train` | Start training the machine learning models using the GPU accelerated container |

## Repository Layout
TODO

### Packages

### Config Files
TODO

## Containers
TODO

## Contributing

Check the [contributing checklist](https://github.com/kiancross/unifed/wiki/Contributing).

## Automated Testing

On each pull request, automated tests are run. These must all pass before
the pull request may be merged.

We use [Codecov](https://codecov.io/) to generate a test coverage report. In
order to access the report, you should log into Codecov using your GitHub
account.

**Always run `yarn checks` before making or pushing code to a pull request
and ensure the checks pass. This preserves our limited GitHub action minutes.**

## Documentation

Documentation for Unifed can be found on the
[Wiki](https://github.com/kiancross/unifed/wiki).

### Protocol

The protocol we developed to allow communication between federated
instances can be found [here](https://kiancross.github.io/cs3099a-specification/#section/Security).

## Synchronisation to School's GitLab

Code pushed to this repository is mirrored to the School's
GitLab service at 06:00 GMT.
