import { errorMessageBehavesCorrectlyFor } from "./utils/errorMessageBehaviour";

context("Actions", () => {
  it("renders errors on invalid input", () => {
    cy.visit("/reset-password/a");
    errorMessageBehavesCorrectlyFor("newPass", "weakpassword", "Passwords do not match");
    cy.get("[data-testid=newPass]").type("weakpassword");
    errorMessageBehavesCorrectlyFor("retyped", "weakpassword", "Password not strong enough");
  });

  it("only enables submit button when all fields are valid", () => {
    cy.get("[data-testid=newPass]").type("weakpassword");
    cy.get("[data-testid=submit]").should("be.disabled");
    cy.get("[data-testid=retyped]").type("weakpassword");
    cy.get("[data-testid=submit]").should("be.disabled");
    cy.get("[data-testid=newPass]").find("input").clear();
    cy.get("[data-testid=retyped]").find("input").clear();
    cy.get("[data-testid=newPass]").type("StrongPassword123!");
    cy.get("[data-testid=submit]").should("be.disabled");
    cy.get("[data-testid=retyped]").type("StrongPassword123!");
    cy.get("[data-testid=submit]").should("not.be.disabled");
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
