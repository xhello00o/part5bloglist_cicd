Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {

  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: { title, author, url,likes },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  })
})

Cypress.Commands.add('createUser',({ username,name,password }) => {
  const user = {
    username,
    name,
    password
  }
  cy.request('POST','http://localhost:3003/api/users',user)
})

