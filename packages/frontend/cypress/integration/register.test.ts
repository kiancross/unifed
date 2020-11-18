import { errorMessageBehavesCorrectlyFor } from "./utils/errorMessageBehaviour";

context("Actions", () => {
  it("renders errors on invalid input", () => {
    cy.visit("/register");
    cy.get("[data-testid=username]").type("invalid username");
    cy.get("[data-testid=name]").type("a".repeat(65));
    cy.get("[data-testid=email]").type("invalid@email");
    cy.get("[data-testid=password]").type("weakpassword");
    cy.get("[data-testid=submit]").click();
    cy.contains("Invalid username");
    cy.contains("Invalid name");
    cy.contains("Invalid email");
    cy.contains("Password not strong enough");
  });

  it("redirects to login page on account creation", () => {
    cy.get("[data-testid=username]").find("input").clear();
    cy.get("[data-testid=name]").find("input").clear();
    cy.get("[data-testid=email]").find("input").clear();
    cy.get("[data-testid=password]").find("input").clear();
    cy.get("[data-testid=username]").type("validusername");
    cy.get("[data-testid=name]").type("valid name");
    cy.get("[data-testid=email]").type("allan11@someemail.com");
    cy.get("[data-testid=password]").type("MyPassword123&&");
    cy.get("[data-testid=submit]").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/login");
  });
});
