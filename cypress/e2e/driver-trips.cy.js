describe('Test de depliegue de itinerario de conductor', () => {

    context("Se inicia sesión como conductor y se ingresa a la página principal de la app", () => {
   
        it('Debería visualizar una lista de viajes', () => {
        //Acceso mediante el icono de sesión
        cy.visit('/');
        cy.get('[data-testid="AccountCircleIcon"]').click()
        cy.contains('Ingresar').click()
        // Ingresa las credenciales en los campos de usuario y contraseña
        cy.get('input[name="correo"]').type('pedro.pascal@gmail.com')
        cy.get('input[id="confirm-password"]').type('password')
        cy.get('button[type="submit"]').click()
    
        cy.visit('/conductor');

        cy.contains('div.MuiContainer-root', 'Santiago - Temuco').should('exist');
        cy.contains('div.MuiContainer-root', 'Concepción - Temuco').should('exist');
        cy.contains('div.MuiContainer-root', 'Puerto Montt - Temuco').should('exist');
        cy.contains('div.MuiContainer-root', 'Calama - Temuco').should('exist');
        cy.contains('div.MuiContainer-root', 'Temuco - Concepción').should('exist');

  
        })
    })   
    
})
  
