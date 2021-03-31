# Unifed

[![Continuous Integration](https://github.com/kiancross/unifed/actions/workflows/continuous-integration.yml/badge.svg?event=schedule)](https://github.com/kiancross/unifed/actions/workflows/continuous-integration.yml?query=event%3Aschedule)
[![School GitLab Mirror](https://github.com/kiancross/unifed/workflows/School%20GitLab%20Mirror/badge.svg)](https://github.com/kiancross/unifed/actions?query=workflow%3A%22School+GitLab+Mirror%22)
[![codecov](https://codecov.io/gh/kiancross/unifed/branch/master/graph/badge.svg?token=FI52RC1RQV)](https://codecov.io/gh/kiancross/unifed)

Unifed is a federated social network, targetted towards a university
environment. The project was developed for our Junior Honours project.

## Protocol

The protocol we developed to allow communication between federated
instances can be found [here](https://kiancross.github.io/cs3099a-specification/#section/Security).

## Documentation

Documentation for Unifed can be found on the
[Wiki](https://github.com/kiancross/unifed/wiki).

## Contributing

Check the [contributing checklist](https://github.com/kiancross/unifed/wiki/Contributing).

### Automated Testing

On each pull request, automated tests are run. These must all pass before
the pull request may be merged.

We use [Codecov](https://codecov.io/) to generate a test coverage report. In
order to access the report, you should log into Codecov using your GitHub
account.

**Always run `yarn checks` before making or pushing code to a pull request
and ensure the checks pass. This preserves our limited GitHub action minutes.**

## Synchronisation to School's GitLab

Code pushed to this repository is mirrored to the School's GitLab service at 6am
every morning.
