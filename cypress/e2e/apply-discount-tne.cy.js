
describe('Descuento TNE', () => {

    context("Se selecciona el descuento con TNE en el formulario de reserva ", () => {
   
        it('Debería validar la aprobacion de la TNE y descontar el total', () => {

            //Buscar y seleccionar viaje 

            cy.visit('/busqueda?from=Santiago&to=Temuco');
            cy.contains('button', 'Seleccionar Asiento').click();

            //Seleccionar asientos

            cy.get('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium span')
            .contains('6')
            .click();

            cy.get('button.MuiButton-containedPrimary')
            .contains('Reservar Asientos')
            .click();

          //  Formulario

            cy.get('input[type="text"]').eq(0).clear().type('Estudiante'); 
            cy.get('input[type="text"]').eq(1).clear().type('206441038'); 
            cy.get('input[type="email"]').clear().type('estudiantecontne@gmail.com'); 
            cy.get('input[id="phoneNumber"]').clear().type('987654326'); 

            //Seleccionar TNE
            cy.get('button.MuiFab-root[aria-label="save"]').click();
            //Comprobar estado de la TNE
            cy.contains('span.MuiTypography-root.MuiTypography-body1.MuiFormControlLabel-label.css-ahj2mt-MuiTypography-root', 'TNE válida').should('exist');
            //Validar Descuento
            cy.contains('span.MuiTypography-root.MuiTypography-h7.MuiTypography-gutterBottom.css-anmq6p-MuiTypography-root', 'Descuento TNE:').should('exist');

        })   
    })
})
  