describe('Test', () => {
    it("Should make post", () => {
        cy.visit('/home')
        cy.contains('Make Post')
        .click()
        .get('textarea[name="textarea"]')
        .clear()
        .type('Hello World')
    })
})