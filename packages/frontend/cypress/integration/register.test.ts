import { errorMessageBehavesCorrectlyFor } from "./utils/errorMessageBehaviour";

context("Actions", () => {
  it("renders errors on invalid input", () => {
    cy.visit("/register");
    errorMessageBehavesCorrectlyFor("username", "invalid username", "Invalid username");
    errorMessageBehavesCorrectlyFor("name", "a".repeat(65), "Invalid name");
    errorMessageBehavesCorrectlyFor("email", "invalid@email", "Invalid email");
    errorMessageBehavesCorrectlyFor("password", "weakpassword", "Password not strong enough");
  });

  it("only enables submit button when all fields are valid", () => {
    cy.get("[data-testid=username]").type("invalid username");
    cy.get("[data-testid=submit]").should("be.disabled");
    cy.get("[data-testid=name]").type("valid name");
    cy.get("[data-testid=submit]").should("be.disabled");
    cy.get("[data-testid=email]").type("allan1@someemail.com");
    cy.get("[data-testid=submit]").should("be.disabled");
    cy.get("[data-testid=password]").type("MyPassword123&&");
    cy.get("[data-testid=submit]").should("be.disabled");
    cy.get("[data-testid=username]").find("input").clear();
    cy.get("[data-testid=username]").type("validusername");
    cy.get("[data-testid=submit]").should("not.be.disabled");
  });

  it("redirects to login page on account creation", () => {
    cy.get("[data-testid=username]").find("input").clear();
    cy.get("[data-testid=name]").find("input").clear();
    cy.get("[data-testid=email]").find("input").clear();
    cy.get("[data-testid=password]").find("input").clear();
    cy.get("[data-testid=username]").type("validusername");
    cy.get("[data-testid=name]").type("valid name");
    cy.get("[data-testid=email]").type("allan1@someemail.com");
    cy.get("[data-testid=password]").type("MyPassword123&&");
    cy.get("[data-testid=submit]").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/login");
  });
});
