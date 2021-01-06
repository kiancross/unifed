# Unifed

[![Automated Tests](https://github.com/kiancross/unifed/workflows/Automated%20Tests/badge.svg?event=schedule)](https://github.com/kiancross/unifed/actions?query=workflow%3A%22Automated+Tests%22+branch%3Amaster)
[![School GitLab Mirror](https://github.com/kiancross/unifed/workflows/School%20GitLab%20Mirror/badge.svg)](https://github.com/kiancross/unifed/actions?query=workflow%3A%22School+GitLab+Mirror%22)
[![codecov](https://codecov.io/gh/kiancross/unifed/branch/master/graph/badge.svg?token=FI52RC1RQV)](https://codecov.io/gh/kiancross/unifed)

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

**Always run `make checks` before making or pushing code to a pull request
and ensure the checks pass. This preserves our limited GitHub action minutes.**

## Synchronisation to School's GitLab

Code pushed to this repository is mirrored to the School's GitLab service at 6am
every morning.
