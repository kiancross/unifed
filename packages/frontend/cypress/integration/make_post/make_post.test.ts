import { accountsClient } from "./../../../src/utils/accounts";
describe("Make Post Test", () => {
  const email = "allan1@someemail.com";
  const password = "MyPassword123&&";

  Cypress.Commands.add("login", () => {
    return accountsClient.loginWithService("password", {
      user: {
        email: email,
      },
      password: password,
    });
  });

  before(() => {
    cy.login().then((res) => {
      expect(res).to.be.ok;
    });
  });

  it("Should make post", () => {
    cy.visit("/home")
      .contains("Make Post")
      .click()
      .get('input[name="title"]')
      .clear()
      .type("Test title")
      .get('textarea[name="textarea"]')
      .clear()
      .type("Test post")
      .get('button[type="submit"]')
      .click();
  });
});
