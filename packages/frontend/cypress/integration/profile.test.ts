context("Public Profile Tests", () => {
  const username = "allan1";

  it("Accesses a profile page", () => {
    cy.visit("/user/" + username);
    cy.get("[data-testid=user-info-card-header]").contains(username);
  });
});
