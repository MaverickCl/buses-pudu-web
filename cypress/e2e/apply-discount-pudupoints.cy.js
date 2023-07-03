describe('Validar el descuento de pudupoints', () => {

    context("Se realiza descuento en el total", () => {
   
        it('Debe disminuir el total de la reserva utilizado el descuento', () => {
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
        .contains('13')
        .click();


        cy.get('button.MuiButton-containedPrimary')
        .contains('Reservar Asientos')
        .click();

        cy.get('button.MuiButton-containedAlert[aria-label="Aplicar Pudú Points"]').click();
        cy.get('input#outlined-basic').clear().type('1');
        cy.get('button.MuiIconButton-root[aria-label="Aplicar Puntos"]').click();
        cy.contains('span.MuiTypography-root.MuiTypography-h7.MuiTypography-gutterBottom.css-anmq6p-MuiTypography-root', 'Descuento Puntos:').should('exist');





        })
    })   
    
})