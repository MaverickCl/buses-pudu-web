describe('Pudu points test', () => {

    context("Se realiza inicio de sesión mediante cuenta de usuario cliente y se realiza una compra", () => {
   
        it('La cantidad de pudupoints debiese ser distinta de 0', () => {
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
            .contains('7')
            .click();

            cy.get('button.MuiButton-containedPrimary')
            .contains('Reservar Asientos')
            .click();

            cy.get('button[type="submit"]').contains('Finalizar').click();
            cy.contains('button', 'Proceder al pago')
            .click();

            //Pago con transbanck
            cy.get('button.payment-options__method-items-option#debito').click();
            cy.get('div.card-wrapper')
            .within(() => {
                cy.get('button.combobox-button')
                .click();

                cy.get('ul.combobox-list li:first-child button')
                .click();
            });

            cy.get('input#pan').type('4511 3466 6003 7060');
            cy.get('button.submit').click();

            cy.get('input#rutClient').type('111111111');
            cy.get('input#passwordClient').type('123');
            cy.get('input[type="submit"][value="Aceptar"]').click();
            cy.get('input[type="submit"][value="Continuar"]').click();

            //Verificacion de pudupoints
            cy.visit('/perfil');
            cy.get('p.MuiTypography-root.MuiTypography-body1')
          .should('not.have.text', '0');

            
        })
    })   
    
})