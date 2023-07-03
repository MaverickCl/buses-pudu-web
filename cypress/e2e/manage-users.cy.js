describe('Gestion de usuarios', () => {

    context("Como administrador se inicia sesion y se gestiona usuarios", () => {
   
        it('Debería crear un usuario nuevo', () => {
            //Acceso mediante el icono de sesión
            cy.visit('/');
            cy.get('[data-testid="AccountCircleIcon"]').click()
            cy.contains('Ingresar').click()
            // Ingresa las credenciales en los campos de usuario y contraseña
            cy.get('input[name="correo"]').type('thiare.morales@gmail.com')
            cy.get('input[id="confirm-password"]').type('password')
            cy.get('button[type="submit"]').click()

            cy.visit('/admin/create');

            // Rellena el campo "Nombre Completo"
            cy.get('input[id="name"]').type('Giovanni Alfonso Cassanelli Pinto');
            
            // Rellena el campo "RUT"
            cy.get('input[id="rut"]').type('2034567879');
            //Fecha de nacimiento
            cy.get('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-edgeEnd.MuiIconButton-sizeMedium[aria-label="Choose date"]')
            .click();
            cy.get('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeSmall.MuiPickersCalendarHeader-switchViewButton[aria-label="calendar view is open, switch to year view"]')
            .click();
            cy.contains('button.MuiPickersYear-yearButton', '2001')
            .click();
            cy.get('button.MuiPickersDay-root.Mui-selected')
            .contains('1')
            .click();


            // Rellena el campo "Rol"
            cy.get('input[id="combo-box-rol"]').type('administrador');
            cy.contains('administrador').click();

            // Rellena el campo "Código País"
            cy.get('select[name="countryCode"]').select('CL +56');
            cy.get('input[id="phoneNumber"]').type('94949494')

            // Rellena el campo "Correo Electrónico"
            cy.get('input[id="email"]').type('fishboy@email.com')
            cy.get('input[id="password"]').type('password')

            cy.get('button.MuiButton-root')
            .contains('Registrar')
            .click();
        })

        it('Debería ingresar con las nuevas credenciales', () => {
            //Acceso mediante el icono de sesión
            cy.visit('/');
            cy.get('[data-testid="AccountCircleIcon"]').click()
            cy.contains('Ingresar').click()
            // Ingresa las credenciales en los campos de usuario y contraseña
            cy.get('input[name="correo"]').type('fishboy@email.com')
            cy.get('input[id="confirm-password"]').type('password')
            cy.get('button[type="submit"]').click()

            
        })

    }) 
})
  
