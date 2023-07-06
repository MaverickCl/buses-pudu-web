
describe('Deplegar listado de viajes coincidentes a la busqueda', () => {

    context("Se realiza la busqueda de viaje mediante una ciudad de origen y destino", () => {
   
        it('Debería existir el viaje de santiago-temuco', () => {

            cy.visit('/');
            
            cy.get('#citySelector').click().type("Santiago").type('{downarrow}').type('{enter}');
            cy.get('input#citySelector').eq(1).click() .type('Temuco').type('{downarrow}').type('{enter}');
            cy.get('button[type="submit"]').click()

            cy.contains('h2', 'Santiago - Temuco').should('exist');
            cy.contains('p', 'Salida: 13:30:00 | Llegada:').should('exist');
            cy.contains('p', 'Desde:').should('exist');

            cy.contains('button', 'Seleccionar Asiento').should('exist');

            cy.contains('button', 'Seleccionar Asiento').click();

            cy.get('div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation3.css-140kvtx-MuiPaper-root')
                .should("exist")
                .within(() => {
                cy.get('h6.MuiTypography-root.MuiTypography-h6.MuiTypography-gutterBottom.css-18k87ye-MuiTypography-root')
                    .should("have.text", "Detalles del Viaje");
                
                cy.get('p.MuiTypography-root.MuiTypography-body1.MuiTypography-gutterBottom.css-d3wcwz-MuiTypography-root')
                    .eq(0)
                    .should("have.text", "Salida: Santiago");
                
                cy.get('p.MuiTypography-root.MuiTypography-body1.MuiTypography-gutterBottom.css-d3wcwz-MuiTypography-root')
                    .eq(1)
                    .should("have.text", "Llegada: Temuco");
                
                cy.get('p.MuiTypography-root.MuiTypography-body1.MuiTypography-gutterBottom.css-d3wcwz-MuiTypography-root')
                    .eq(2)
                    .should("have.text", "Hora de salida: 13:30:00");
                
                cy.get('p.MuiTypography-root.MuiTypography-body1.MuiTypography-gutterBottom.css-d3wcwz-MuiTypography-root')
                    .eq(3)
                    .should("have.text", "Precio aprox: $10.000");
                });
        })
    })   
})
  