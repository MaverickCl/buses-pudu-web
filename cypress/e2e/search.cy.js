
  describe('Busqueda de viaje', () => {

    context("Se realiza la busqueda de viaje mediante una ciudad de origen y destino", () => {
   
        it('Debería existir el viaje de santiago-temuco', () => {

            cy.visit('/');
            
            cy.get('#citySelector').click().type("Santiago").type('{downarrow}').type('{enter}');
            cy.get('input#citySelector').eq(1).click() .type('Temuco').type('{downarrow}').type('{enter}');
            cy.get('button[type="submit"]').click()

            cy.contains('h2', 'Santiago - Temuco').should('exist');
            cy.contains('p', 'Fecha: 2023-05-18').should('exist');
            cy.contains('p', 'Salida: 13:30:00 | Llegada:').should('exist');
            cy.contains('p', 'Desde:').should('exist');
            cy.contains('h3', '$10000').should('exist');
            cy.contains('button', 'Seleccionar Asiento').should('exist');

        })
    })   
    
})
  