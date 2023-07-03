describe('Test editar atributo de un perfil', () => {

    context("Se inicia sesión como cliente para luego editar el atributo de correo. Luego se inica sesión de nuevo con las credencial modificada", () => {
   
        it('Debería cambiarse el correo del usuario', () => {
        //Acceso mediante el icono de sesión
        cy.visit('/');
        cy.get('[data-testid="AccountCircleIcon"]').click()
        cy.contains('Ingresar').click()
        // Ingresa las credenciales en los campos de usuario y contraseña
        cy.get('input[name="correo"]').type('camilamartinez@gmail.com')
        cy.get('input[id="confirm-password"]').type('password')
        cy.get('button[type="submit"]').click()
    
        //Edicion
        cy.get('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium[aria-label="Cuenta"]')
        .click();

        cy.contains('p.MuiTypography-body1', 'Perfil').click();
        cy.get('button.MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedSuccess.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.css-gh84jp-MuiButtonBase-root-MuiButton-root')
        .contains('Editar')
          .click();

          cy.get('input#email')
          .clear()
          .type('camilamartinez01@gmail.com');

          cy.get('button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedSuccess.MuiButton-sizeMedium.MuiButton-containedSizeMedium.css-hu0rfb-MuiButtonBase-root-MuiButton-root')
  .click();

        })

        it('Debería poder ingresar con las nuevas credenciales', () => {
            //Acceso mediante el icono de sesión
            cy.visit('/');
            cy.get('[data-testid="AccountCircleIcon"]').click()
            cy.contains('Ingresar').click()
            // Ingresa las credenciales en los campos de usuario y contraseña
            cy.get('input[name="correo"]').type('camilamartinez01@gmail.com')
            cy.get('input[id="confirm-password"]').type('password')
            cy.get('button[type="submit"]').click()
        
            })
    })   
    
})
  
