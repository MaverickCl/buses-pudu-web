describe('Login Test', () => {

    context("Se realiza inicio de sesión mediante cuenta de administrador", () => {
   
        it('Formulario de inicio de sesión', () => {
        //Acceso mediante el icono de sesión
        cy.visit('/');
        cy.get('[data-testid="AccountCircleIcon"]').click()
        cy.contains('Ingresar').click()
        // Ingresa las credenciales en los campos de usuario y contraseña
        cy.get('input[name="correo"]').type('thiare.morales@gmail.com')
        cy.get('input[id="confirm-password"]').type('password')
        cy.get('button[type="submit"]').click()
    
        //Verificación de elementos
        cy.contains('¡Bienvenido de vuelta!').should('exist');
        cy.contains('Gestiona tus pasajes').should('exist');
        cy.contains('Pudú Points').should('exist');
        //cy.get('h2').should('have.text', '¿A DÓNDE TE LLEVAMOS HOY?');
  
        })
    })   
    
})
  
