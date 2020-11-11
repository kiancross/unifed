/*
 * CS3099 Group A3
 */

/* eslint-disable */

module.exports = (on, config) => {
  require("@cypress/code-coverage/task")(on, config);

  return config;
};
