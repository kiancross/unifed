import { accountsClient, passwordClient } from "../../src/utils/accounts";

context("Account Settings Page Tests", () => {
  // user already needs to exist
  const newName = "John Smith";
  const email = "allan1@someemail.com";
  const password = "MyPassword123&&";
  const otherPassword = "MyNewPassword123&&";

  Cypress.Commands.add("login", (email: string, password: string) => {
    return accountsClient.loginWithService("password", {
      user: {
        email: email,
      },
      password: password,
    });
  });

  Cypress.Commands.add("resetPassword", () => {
    return passwordClient.changePassword(otherPassword, password);
  });

  Cypress.Commands.add("logout", () => {
    return accountsClient.logout();
  });

  it("Checks guest users get redirected from account settings page", () => {
    cy.visit("/account");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("Checks logged in users see their account settings", () => {
    cy.login(email, password).then((res) => {
      expect(res).to.be.ok;
    });
    cy.visit("/account");
    cy.contains("PROFILE").click();
    cy.contains("ACCOUNT").click();
    cy.logout();
  });

  it("Checks users can change password", () => {
    cy.login(email, password).then((res) => {
      expect(res).to.be.ok;
    });
    cy.visit("/account");
    cy.get("#change-password-button").click();
    cy.get("[data-testid=old-password]").type(password + "wrong");
    cy.get("[data-testid=new-password]").type(otherPassword);
    cy.get("[data-testid=confirm-password]").type(otherPassword);
    cy.contains("Change").click();
    cy.get("[data-testid=old-password]").clear().type(password);
    cy.contains("Change").click();
    cy.login(email, otherPassword).then((res) => {
      expect(res).to.be.ok;
    });
    cy.resetPassword();
    cy.logout();
  });

  it("Checks user can change their name", () => {
    cy.login(email, password).then((res) => {
      expect(res).to.be.ok;
    });
    cy.visit("/account");
    cy.contains("PROFILE").click();
    cy.get("#change-name-button").click();
    cy.get("[data-testid=name]").type(newName);
    cy.contains("Update").click();
    cy.contains("PROFILE").click();
    cy.contains(newName);
    cy.logout();
  });
});
