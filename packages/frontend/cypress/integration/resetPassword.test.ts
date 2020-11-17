import { errorMessageBehavesCorrectlyFor } from "./utils/errorMessageBehaviour";

context("Actions", () => {
  it("renders errors on invalid input", () => {
    cy.visit("/reset-password/a");
    cy.get("[data-testid=newPass]").type("weakpassword");
    cy.get("[data-testid=submit]").click();
    cy.contains("Passwords do not match");
    cy.get("[data-testid=retyped]").type("weakpassword");
    cy.get("[data-testid=submit]").click();
    cy.contains("Password not strong enough");
  });

  // it("redirects to login page on password reset", () => {
  //   cy.get("[data-testid=newPass]").find("input").clear();
  //   cy.get("[data-testid=retyped]").find("input").clear();
  //   cy.get("[data-testid=newPass]").type("StrongPassword123!");
  //   cy.get("[data-testid=retyped]").type("StrongPassword123!");
  //   cy.get("[data-testid=submit]").click();
  //   cy.url().should("eq", Cypress.config().baseUrl + "/");
  // });
});
