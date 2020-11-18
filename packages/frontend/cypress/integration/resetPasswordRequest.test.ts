import { errorMessageBehavesCorrectlyFor } from "./utils/errorMessageBehaviour";

context("Actions", () => {
  it("renders errors on invalid input", () => {
    cy.visit("/reset-password");
    cy.get("[data-testid=email]").type("invalid@email");
    cy.get("[data-testid=submit]").click();
    cy.contains("Invalid email");
  });

  /*
  it("redirects to login page on request", () => {
    cy.get("[data-testid=email]").find("input").clear();
    cy.get("[data-testid=email]").type("valid@email.com");
    cy.get("[data-testid=submit]").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/login");
  });
 */
});
