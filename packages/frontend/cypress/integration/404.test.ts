context("404 Page Not Found Tests", () => {
  it("Accesses a page that does not exist", () => {
    cy.visit("/pagethatdoesnotexist");
    cy.contains("Whoops!");
    cy.contains("Take me Home!").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/home");
  });
});
