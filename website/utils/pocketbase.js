import PocketBase from 'pocketbase'

export async function fetchPrompt(promptID) {
    const client = new PocketBase('http://127.0.0.1:8090')
    const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
    try {
        return client.records.getOne('prompts', promptID)
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function fetchUserPrompts(userID) {
    // Returns paginated list of user prompts
    const client = new PocketBase('http://127.0.0.1:8090')
    const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
    try {
        return client.records.getList('prompt_reviews', 1, 50, {
            filter: `user = "${userID}"`,
        });
    } catch (error) {
        return null
    }
}

export async function createUserPromptReview(userID, promptID) {
    const client = new PocketBase('http://127.0.0.1:8090')
    const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
    const data = {
        'user': userID,
        'prompt_id': promptID,
    }
    const record = await client.records.create('prompt_reviews', data)
}

