import { accountsClient } from "../../../src/utils/accounts";
describe("Make Comment Test", () => {
  const email = "allan1@someemail.com";
  const password = "MyPassword123&&";
  const postId = "06752e4c-49ba-4887-af00-4176aff93286";

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
    cy.visit("/instances/localhost:8080/communities/all/posts/" + postId);
  });

  it("Should make comment", () => {
    cy.get('textarea[name="textarea"]')
      .clear()
      .type("Test Comment")
      .get('button[type="submit"]')
      .click();
    cy.contains("Test Comment");
  });
});
