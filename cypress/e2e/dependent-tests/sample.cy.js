describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com/login')

    //cy.get('.navbar-nav a:contains(Login)').click()

    cy.get('#email').type(Cypress.env('USER_EMAIL'))
    cy.get('#password').type(Cypress.env('USER_PASSWORD'), { log: false })
    cy.get('button[type="submit"]').click()
    
    cy.contains('h1', 'Your Notes', { timeout: 10000 })
      .should('be.visible')
  })

  it('CRUDs a note', () => {
    //create
    cy.contains('Create a new note').click()

    cy.get('#content').type('My note')
    cy.contains('Create').click()

    //Assert the note was created
    cy.get('.list-group')
      .should('contain', 'My note')
      .click()

    //Updates the note
    //cy.get('.list-group').contains('My note').click()
    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    //Assert the note was updated
    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)')
      .should('be.visible')
      .click()

    //Deletes the note
    //cy.get('.list-group').contains('My note updated').click()
    cy.contains('Delete').click()

    //Assert the note was deleted
    cy.get('.list-group:contains(My note updated)').should('not.exist')
  })
})
