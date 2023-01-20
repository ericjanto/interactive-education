describe('Allows API access for authorised users', () => {
  it('Simulate login & requests', () => {
    cy.visit('https://interactive-education.vercel.app/api/auth/login')

    // fill out a form field
    cy.get('input[name="username"]')
      .type('test@example.com')
      .get('input[name="password"]')
      .type('Example1')

    // simulate clicking submit
    cy.get('button[type=submit]')
      .click()

    cy.wait(500)

    cy.visit('https://interactive-education.vercel.app/')
    cy.wait(500)

    // Check that now authorised to
    // use API route for writing to the database and still retrieving

    cy.request({
      method: 'GET',
      url: 'https://interactive-education.vercel.app/api/prompts/aeoijartn099934lna'
    }).then(response => {
      expect(response.status).to.eq(200)
    })

    cy.request({
      method: 'GET',
      url: 'https://interactive-education.vercel.app/api/promptscontents/aeoijartn099934lna/aeoijartn099934lna/aeoijartn099934lna'
    }).then(response => {
      expect(response.status).to.eq(200)
    })

    cy.request({
      method: 'GET',
      url: 'https://interactive-education.vercel.app/api/userprompts'
    }).then(response => {
      expect(response.status).to.eq(200)
    })

    cy.request({
      method: 'POST',
      url: 'https://interactive-education.vercel.app/api/userprompts'
    }).then(response => {
      expect(response.status).to.eq(200)
    })
  })
})