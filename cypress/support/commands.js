Cypress.Commands.add('createBlog', ({ title, author, url }) => {

    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        body: { title, author, url },
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token
                }`,
        },
    })
})

