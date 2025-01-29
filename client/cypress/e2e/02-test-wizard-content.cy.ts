describe("globaLeaks footer content", () => {
  it("should have the footer", () => {
    cy.visit("/#/");

    cy.request("/api/public").as('public');

    cy.get("#FooterBox").should("be.visible");

    if (Cypress.env('language')!="en") {
      cy.get('#language-picker-select').click();
      cy.get(`[data-cy="${Cypress.env('language')}"]`).trigger('click');
    }

    cy.takeScreenshot("footer/1");

    cy.get('@public').then((r) => {
      expect(r.status).to.eq(200);
      expect(r.body).to.have.property('node');
      expect(r.body.node).to.have.property('version');
      expect(r.body.node.version).to.not.be.empty;

      cy.get("#AttributionClause").children().eq(0)
        .should('be.visible')
        .contains('This platform is managed by Luna Partner S.r.l.');
      cy.get("#AttributionClause").children().eq(-1)
        .should('be.visible')
        .contains(`Custom codebase developed by Luna Partner S.r.l. based on release ${r.body.node.version}.`);
    });
  });
});
