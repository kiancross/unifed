describe("Make Post Test", () => {
  it("Should make post", () => {
    cy.visit("/home");
    cy.contains("Make Post")
      .click()
      .get('input[name="title"]')
      .clear()
      .type("Test Title")
      .get('textarea[name="textarea"]')
      .clear()
      .type("Hello World")
      .get('button[type="submit"]')
      .click();
  });
});