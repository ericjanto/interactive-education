describe('Protects API against unauthorised users', () => {
    it('Simulate login & requests', () => {
      // Check that not authorised to
      // use API route for writing to the database and still retrieving
        cy.visit('https://interactive-education.vercel.app')

      cy.request({
        method: 'GET',
        url: '/api/prompts/aeoijartn099934lna',
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.eq(404)
      })
  
      cy.request({
        method: 'GET',
        url: 'api/promptscontents/aeoijartn099934lna/aeoijartn099934lna/aeoijartn099934lna',
      }).then(response => {
        expect(response.status).to.eq(200)
      })
  
      cy.request({
        method: 'GET',
        url: '/api/userprompts',
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.eq(401)
      })
  
      cy.request({
        method: 'POST',
        url: '/api/userprompts',
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.eq(401)
      })
    })
  })