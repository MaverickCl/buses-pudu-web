describe('Register Test', () => {

    context("Se registra usuario de tipo cliente en el sistema", () => {
   
        it('Formulario de inicio de sesión', () => {
        //Acceso mediante el icono de sesión
        cy.visit('/');

        cy.get('[data-testid="AccountCircleIcon"]').click()
        cy.contains('Registrarse').click()

        //Nombre 
        cy.get('input[id="Name"]').type('Matías Carrasco')
        //Rut
        cy.get('input[id="rut"]').type('206000093')
        
        //TNE validación
        cy.get('button[aria-label="save"]').click();
            
        //Fecha de nacimiento
        cy.get('[data-testid="CalendarIcon"]').click()
        cy.get('.MuiPickersCalendarHeader-switchViewButton').click();
        cy.contains('div.MuiPickersYear-root button', '2000').click();
       
        //Contacto
        cy.get('#countryCode-select').select('+56');
        cy.get('input[id="phoneNumber"]').type('94949494')

        //Comprobar estado de TNE vencida con el RUT
        cy.contains('span', 'TNE vencida');

        //Correo
        cy.get('input[id="email"]').type('nosoyelmati@gmail.com')
        //Contraseña
        cy.get('input[id="confirm-password"]').type('password')

        //Envío de formulario
        cy.get('button[type="submit"]').click()

        //Mensaje de creación de usuario exitoso
        cy.get('p.MuiTypography-root.MuiDialogContentText-root.MuiTypography-body1.MuiDialogContentText-root.css-qfso29-MuiTypography-root-MuiDialogContentText-root[id="alert-dialog-slide-description"]').should("exist").and("contain", "Redireccionando a la página de inicio de sesión...");
        
        })
    })   
})
  