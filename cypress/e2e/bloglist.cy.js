

describe('Bloglist app', () => {
  beforeEach(function () {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
      _id: '64801d5a7b677bd4f2e5efd8',
      username: 'root',
      name: 'testroot',
      password: 'password123',
      __v: 0
    }

    cy.request('POST','http://localhost:3003/api/users',user)

    cy.visit('http://localhost:3000')
  })
  it('web opens successfully with correct default login page', () => {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('login').click()
  })


  describe('login tests', function() {
    it('succeed with correct login',function (){
      cy.get('#username').type('root')
      cy.get('#password').type('password123')
      cy.contains('login').click()
    })

    it('failed with wrong login',function (){
      cy.get('#username').type('root')
      cy.get('#password').type('wrongpassword')
      cy.contains('login').click()
      cy.get('.error').contains('Wrong credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

    })
  })

  describe('when logged in', function(){
    beforeEach( function() {
      cy.request('POST','http://localhost:3003/api/login',{ username:'root',password:'password123' })
        .then(response => {
          localStorage.setItem('loggedUser',JSON.stringify(response.body))
        })
      cy.visit('http://localhost:3000')
    })
    it.only('create a blog', function(){
      cy.contains('Create New Blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#url').parent().parent().find('button')
        .click()

      cy.get('.success').should('contain','test title')
        .and('contain','test author')

      cy.get('p').contains('test title')
        .should('contain','test author')
        .parent()
        .find('button').click()
        .parent()
        .and('contain','test url')

    })
    it.only('like a blog', function (){
      cy.createBlog({
        title:'test title',
        author:'test author',
        url:'test url'
      })
      cy.visit('http://localhost:3000')
      cy.contains('Create New Blog').click()
      cy.get('p').contains('test author').parent().find('button').as('viewButton').click()
      cy.get('p').get('button').contains('like').click()
      cy.get('p').contains('likes').should('contain','likes 1')
      
    })


  })
})