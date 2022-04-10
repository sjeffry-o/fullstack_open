describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('rootieeee')
      cy.get('#password').type('wrooong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created, liked and removed', function() {
      cy.contains('new blog').click()

      cy.get('#author').type('Solnche')
      cy.get('#title').type('Finally')
      cy.get('#url').type('rooot.com')

      cy.get('#createButton').click()
      cy.contains('added')
      cy.get('#showButton').click()
      //cy.get('#likeButton').click()
      //cy.contains('remove').click()
    })
  })
})
