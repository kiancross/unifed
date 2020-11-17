import { errorMessageBehavesCorrectlyFor } from "./utils/errorMessageBehaviour";

context("Actions", () => {
  it("renders errors on invalid input", () => {
    cy.visit("/login");
    cy.get("[data-testid=submit").click();
    cy.contains("Invalid email");
    cy.contains("Password not strong enough");
    cy.get(`[data-testid=email]`).type("invalid@email");
    cy.get(`[data-testid=password]`).type("weakpassword");
    cy.get("[data-testid=submit").click();
    cy.contains("Invalid email");
    cy.contains("Password not strong enough");
  });

  it("redirects to homepage on successful login", () => {
    cy.get("[data-testid=email]").find("input").clear();
    cy.get("[data-testid=password]").find("input").clear();
    cy.get(`[data-testid=email]`).type("allan1@someemail.com");
    cy.get(`[data-testid=password]`).type("MyPassword123&&");
    cy.get("[data-testid=submit").click();

    const matches = Cypress.config().baseUrl.match(/^https?:\/\/(.*)/);
    if (!matches) {
      throw new Error("Invalid baseUrl");
    }

    cy.url().should(
      "eq",
      `${Cypress.config().baseUrl}/instances/${matches[1]}/communities/all/posts`,
    );
  });
});
