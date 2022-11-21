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

export async function fetchUserPromptsReviews(userID) {
    // Returns paginated list of user prompts
    const client = new PocketBase('http://127.0.0.1:8090')
    const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
    try {
        // TODO: this should probably not be limited to 50
        return client.records.getList('prompt_reviews', 1, 400, {
            filter: `user = "${userID}"`,
        });
    } catch (error) {
        return null
    }
}

export async function createUserPromptReview(userID, promptID, remembered, nextDueDate) {
    const client = new PocketBase('http://127.0.0.1:8090')
    const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
    const data = {
        'user': userID,
        'prompt_id': promptID,
        'remembered': remembered,
        'calculated_next_due': nextDueDate,
    }
    const record = await client.records.create('prompt_reviews', data)
}

export async function fetchUserSpecificPromptReviews(userID, promptID) {
    // returns in order of most recent due date
    const client = new PocketBase('http://127.0.0.1:8090')
    const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
    try {
        return client.records.getList('prompt_reviews', 1, 2, {
            filter: `user = "${userID}" && prompt_id = "${promptID}"`,
            sort: "-calculated_next_due",
        });
    } catch (error) {
        return null
    }
}

export async function fetchSameContext(userID, promptID, contextLink) {
    const client = new PocketBase('http://127.0.0.1:8090')
    const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
    try {
        return client.records.getList('prompt_contexts', 1, 1, {
            filter: `user = "${userID}" && prompt_id = "${promptID}" && context_link = "${contextLink}"`,
        });
    } catch (error) {
        return null
    }
}

export async function createPromptContext(userID, promptID, contextLink, linkName) {
    const client = new PocketBase('http://127.0.0.1:8090')
    const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
    // Manually set ID so that we prevent duplicates
    // const id = userID + promptID + contextLink
    const data = {
        'user': userID,
        'prompt_id': promptID,
        'context_link': contextLink,
        'link_name': linkName,
    }
    const record = await client.records.create('prompt_contexts', data)
}

export async function fetchUserSpecificPromptContexts(userID, promptID) {
    // returns in order of most recent creation date
    const client = new PocketBase('http://127.0.0.1:8090')
    const adminAuthData = await client.admins.authViaEmail('s1975761@ed.ac.uk', 'interactiveVideos')
    try {
        return client.records.getList('prompt_contexts', 1, 50, {
            filter: `user = "${userID}" && prompt_id = "${promptID}"`,
            sort: "-created",
        });
    } catch (error) {
        return null
    }
}