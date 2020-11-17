import { errorMessageBehavesCorrectlyFor } from "./utils/errorMessageBehaviour";

context("Actions", () => {
  it("renders errors on invalid input", () => {
    cy.visit("/reset-password");
    errorMessageBehavesCorrectlyFor("email", "invalid@email", "Invalid email");
  });

  it("only enables submit button when all fields are valid", () => {
    cy.get("[data-testid=email]").type("invalid@email");
    cy.get("[data-testid=submit]").should("be.disabled");
    cy.get("[data-testid=email]").find("input").clear();
    cy.get("[data-testid=email]").type("valid@email.com");
    cy.get("[data-testid=submit]").should("not.be.disabled");
  });

  it("redirects to login page on request", () => {
    cy.get("[data-testid=email]").find("input").clear();
    cy.get("[data-testid=email]").type("valid@email.com");
    cy.get("[data-testid=submit]").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/login");
  });
});
