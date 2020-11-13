export function errorMessageBehavesCorrectlyFor(
  field: string,
  invalidInput: string,
  errorMessage: string,
): void {
  cy.get(`[data-testid=${field}]`).type(invalidInput);
  cy.contains(errorMessage);
  cy.get(`[data-testid=${field}]`).find("input").clear();
  cy.contains(errorMessage).should("not.exist");
}
