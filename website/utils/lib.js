export function getNormalisedUserID(userID) {
    return userID.replace('auth0|','')
}