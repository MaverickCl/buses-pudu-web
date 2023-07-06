
describe('Adquirir boleto', () => {

    context("Se selecciona el boleto ", () => {
   
        it('Debería rerservar los asientos', () => {

            //Buscar y seleccionar viaje 

            cy.visit('/busqueda?from=Santiago&to=Temuco');
            cy.contains('button', 'Seleccionar Asiento').click();

            //Seleccionar asientos

            cy.get('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium span')
            .contains('5')
            .click();

            cy.get('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium span')
            .contains('6')
            .click();

            cy.get('button.MuiButton-containedPrimary')
            .contains('Reservar Asientos')
            .click();

          //  Formulario

            cy.get('input[type="text"]').eq(0).clear().type('Pasajero 1'); 
            cy.get('input[type="text"]').eq(1).clear().type('18765432-1'); 
            cy.get('input[type="email"]').clear().type('nuevo.email@gmail.com'); 
            cy.get('input[id="phoneNumber"]').clear().type('987654321'); 

            cy.get('button[type="submit"]').contains('Pasajero listo').click(); 

            cy.get('div.MuiFormControl-root.MuiTextField-root input[type="text"]').eq(0).type('Pasajero 1');
            cy.get('div.MuiFormControl-root.MuiTextField-root input[type="text"]').eq(1).type('18765433-1');
            cy.get('div.MuiFormControl-root.MuiTextField-root input[type="email"]').type('nuevo.email2@gmail.com');
            cy.get('select[name="countryCode"]').select('CL +56');
            cy.get('div.MuiFormControl-root.MuiTextField-root input[type="text"]').eq(2).type('987654322');
           

            cy.get('div.MuiFormControl-root.MuiTextField-root input[type="text"]').eq(0).type('Pasajero 1');
            cy.get('button[type="submit"]').contains('Finalizar').click();

            //Comprobar estado de reserva 
            cy.get('p.MuiTypography-root.MuiTypography-body1.css-ahj2mt-MuiTypography-root')
            .contains('¡Has completado el formulario! ¡Estás listo!')
            .should('exist');
            
        })

        it('Comprobar la reserva de asiento', () => {
            cy.visit('/busqueda?from=Santiago&to=Temuco');
            cy.contains('button', 'Seleccionar Asiento').click();

            cy.get('button:disabled span')
            .contains('5');


            cy.get('button:disabled span')
            .contains('6');


        })
    })   
})
  