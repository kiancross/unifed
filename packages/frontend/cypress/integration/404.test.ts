context("404 Page Not Found Tests", () => {
  it("Accesses a page that does not exist", () => {
    cy.visit("/pagethatdoesnotexist");
    cy.contains("404 Page Not Found");
    cy.contains("Return Home").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/login");
  });
});
