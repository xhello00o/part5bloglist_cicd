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
    it('create a blog', function(){
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
    it('like a blog', function (){
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
    it('delete a blog', function(){
      cy.createBlog({
        title:'test title',
        author:'test author',
        url:'test url'
      })
      cy.visit('http://localhost:3000')
      cy.get('p').contains('test title').find('button').as('viewbutton').click()
      cy.get('p').contains('remove').click()
      cy.get('p').should('not.contain','test title')
    })

    it('only show delete for blogs created by user', function(){
      cy.createUser({
        username:'root2',
        name:'testroot2',
        password:'password1234'
      })
      cy.createBlog({
        title:'test title',
        author:'test author',
        url:'test url'
      })
      cy.visit('http://localhost:3000')
      cy.contains('logout').click()
      cy.get('#username').type('root2')
      cy.get('#password').type('password1234')
      cy.contains('login').click()
      cy.get('p').contains('test title').find('button').click()
      cy.get('p').contains('test title').should('not.contain','remove')

    })
    it('Blogs are sorted', function(){
      cy.createBlog({
        title:'test title2',
        author:'test author',
        url:'test url',
        likes:5
      })
      cy.createBlog({
        title:'test title1',
        author:'test author',
        url:'test url',
        likes:10
      })
      cy.createBlog({
        title:'test title3',
        author:'test author',
        url:'test url',
        likes:1
      })
      cy.visit('http://localhost:3000')
      cy.get('.blog').eq(0).should('contain',' test title1')
      cy.get('.blog').eq(1).should('contain',' test title2')
      cy.get('.blog').eq(2).should('contain',' test title3')


    })



  })
})