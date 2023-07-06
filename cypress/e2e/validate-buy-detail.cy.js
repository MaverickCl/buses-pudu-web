describe('Validar el detalle de compra', () => {

    context("Se realiza reserva de boleto", () => {
   
        it('Deben existir los datos y total de reserva', () => {
        //Acceso mediante el icono de sesión
        cy.visit('/');
        cy.get('[data-testid="AccountCircleIcon"]').click()
        cy.contains('Ingresar').click()
        // Ingresa las credenciales en los campos de usuario y contraseña
        cy.get('input[name="correo"]').type('camilamartinez@gmail.com')
        cy.get('input[id="confirm-password"]').type('password')
        cy.get('button[type="submit"]').click()

        cy.get('#citySelector').click().type("Santiago").type('{downarrow}').type('{enter}');
        cy.get('input#citySelector').eq(1).click() .type('Temuco').type('{downarrow}').type('{enter}');
        cy.get('button[type="submit"]').click()
       
        //  cy.visit('/busqueda?from=Santiago&to=Temuco');
        cy.contains('button', 'Seleccionar Asiento').click();

            //Seleccionar asientos
            cy.get('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium span')
            .contains('10')
            .click();

            cy.get('button.MuiButton-containedPrimary')
            .contains('Reservar Asientos')
            .click();

            cy.get('button[type="submit"]').contains('Finalizar').click();

            cy.contains('Compra de Pasajes').should('exist');
            cy.contains('Usar Pudú Points').should('exist');
            cy.contains('Total:').should('exist');
            cy.contains('Pasajeros:').should('exist');
            cy.contains('- Camila Martinez').should('exist');
            cy.contains('Proceder al pago').should('exist');

        })
    })   
    
})