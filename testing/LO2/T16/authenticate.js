import auth0 from 'auth0-js'

export function authenticateTestUser() {
    const webAuth = new auth0.WebAuth({
        domain: process.env.DOMAIN,
        clientID: process.env.CLIENT_ID
    });

    webAuth.login({
        realm: 'tests',
        username: process.env.TEST_USER_USERNAME,
        password: process.env.TEST_USER_PWD
    });
}