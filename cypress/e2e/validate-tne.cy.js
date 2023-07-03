describe('Válidacion de la TNE', () => {

    context("Se registra usuario de tipo cliente en el sistema y se válida el estaod de su TNE", () => {
   
        it('El estado de la TNE debe ser válida', () => {
        //Acceso mediante el icono de sesión
        cy.visit('/');

        cy.get('[data-testid="AccountCircleIcon"]').click()
        cy.contains('Registrarse').click()

        //Nombre 
        cy.get('input[id="Name"]').type('Test TNE')
        //Rut
        cy.get('input[id="rut"]').type('206441038')
        
        //TNE validación
        cy.get('button[aria-label="save"]').click();
        

        //Comprobar estado de TNE vencida con el RUT
        cy.contains('span', 'TNE válida');

        
        })
    })   
})
  