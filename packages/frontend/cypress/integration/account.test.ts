import { accountsClient } from "./../../src/utils/accounts";

context("Actions", () => {
  // user already needs to exist
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

  it("Checks guest users get redirected from account settings page", () => {
    cy.visit("/account");
    cy.url().should("eq", "http://localhost:8080/");
  });

  it("Checks logged in users see their account settings", () => {
    cy.login().then((res) => {
      expect(res).to.be.ok;
    });
    cy.visit("/account");
    cy.contains("PROFILE").click();
    cy.contains("ACCOUNT").click();
  });

  it("Checks users can see form to change password", () => {
    cy.login().then((res) => {
      expect(res).to.be.ok;
    });
    cy.visit("/account");
    cy.get("#change-password-button").click();
    cy.contains("Cancel").click();
    cy.get("#change-password-button").click();
    cy.get("[data-cy=old-password]").type("old pass");
    cy.get("[data-cy=new-password]").type("new password");
    cy.get("[data-cy=confirm-password]").type("new password");
    cy.contains("Save").click();
  });
});
