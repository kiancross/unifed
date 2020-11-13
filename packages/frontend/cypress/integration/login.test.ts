import { errorMessageBehavesCorrectlyFor } from "./utils/errorMessageBehaviour";

context("Actions", () => {
  it("renders errors on invalid input", () => {
    cy.visit("/");
    cy.contains("Welcome Back!");
    errorMessageBehavesCorrectlyFor("email", "invalid@email", "Invalid email");
    errorMessageBehavesCorrectlyFor("password", "weakpassword", "Password not strong enough");
  });

  it("only enables submit button when all fields are valid", () => {
    cy.get("[data-testid=email]").type("invalid@email");
    cy.get("[data-testid=submit]").should("be.disabled");
    cy.get("[data-testid=password]").type("MyPassword123&&");
    cy.get("[data-testid=submit]").should("be.disabled");
    cy.get("[data-testid=email]").find("input").clear();
    cy.get("[data-testid=email]").type("allan1@someemail.com");
    cy.get("[data-testid=submit]").should("not.be.disabled");
  });

  it("redirects to homepage on successful login", () => {
    cy.get("[data-testid=email]").find("input").clear();
    cy.get("[data-testid=password]").find("input").clear();
    cy.get(`[data-testid=email]`).type("allan1@someemail.com");
    cy.get(`[data-testid=password]`).type("MyPassword123&&");
    cy.get("[data-testid=submit").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/home");
  });
});
