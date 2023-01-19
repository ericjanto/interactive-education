describe('Protects against login of unregistered users', () => {
  it('Follows login link', () => {
    cy.visit('https://interactive-education.vercel.app/')

    // Attempt invalid login where we don't add valid login details
    cy.contains('Login', { timeout: 10000 }).click()

    // Check that still unauthorised to
    // use API route for writing to the database
    cy.request({
      method: 'POST',
      url: '/api/userprompts',
      failOnStatusCode: false // allow the request to fail
    }).then(response => {
      expect(response.status).to.eq(401) // check the status code is 401
    })
  })
})

describe('Authorisation cannot be gained through review platform link', () => {
  it('Follows review platform link', () => {
    cy.visit('https://interactive-education.vercel.app/')

    // Attempt gaining access through review platform route
    cy.contains('Review prompts', { timeout: 10000 }).click()

    // Check that still unauthorised to
    // use API route for writing to the database
    cy.request({
      method: 'POST',
      url: '/api/userprompts',
      failOnStatusCode: false // allow the request to fail
    }).then(response => {
      expect(response.status).to.eq(401) // check the status code is 401
    })
  })
})