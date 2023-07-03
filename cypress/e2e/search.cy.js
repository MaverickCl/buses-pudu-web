
  describe('Busqueda de viaje', () => {

    context("Se realiza la busqueda de viaje mediante una ciudad de origen y destino", () => {
   
        it('Debería existir el viaje de santiago-temuco', () => {

            cy.visit('/');
            
            cy.get('#citySelector').click().type("Santiago").type('{downarrow}').type('{enter}');
            cy.get('input#citySelector').eq(1).click() .type('Temuco').type('{downarrow}').type('{enter}');
            cy.get('button[type="submit"]').click()

            cy.contains('h2', 'Santiago - Temuco').should('exist');

        })
    })   
    
})
  