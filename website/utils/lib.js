import process from 'process'

export function getNormalisedUserID(userID) {
    return userID.replace('auth0|', '')
}

export function daysBetweenDates(first, second) {
    // Copy date parts of the timestamps, discarding the time parts.
    var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(days);
}

export function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function getDueReviewPrompts(reviewHistory) {
    if (!reviewHistory || reviewHistory.length == 0) {
        return {}
    }
    const now = new Date()

    // entries which have date before or equal to now
    // {prompt_id:next_due_date}
    let promptDict = {}
    for (var i = 0; i < reviewHistory.length; i++) {
        let reviewRecord = reviewHistory[i]
        const promptID = reviewRecord.promptID
        const dueDate = reviewRecord.calculatedNextDue.toDate()
        if (promptID in promptDict) {
            if (promptDict[promptID] < dueDate) {
                promptDict[promptID] = dueDate
            }
        } else {
            promptDict[promptID] = dueDate
        }
    }

    // Remove those entries which are in the future
    Object.keys(promptDict).forEach((key) => {
        if (daysBetweenDates(now, promptDict[key]) > 0) {
            delete promptDict[key]
        }
    });


    return Object.keys(promptDict)
}

export function getBaseUrl() {
    if (process.env.NODE_ENV == 'development') {
        return 'http://localhost:3000/'
    } else {
        return 'https://interactive-education.vercel.app/'
    }
}

export function sessionCookieExists() {
    // Determines whether appSession (httpOnly) cookie exists
    // by trying to override it.
    
    // Does not determine whether the session
    // cookie is valid!
    const cookiename = 'appSession'
    var d = new Date();
    d.setTime(d.getTime() + (1000));
    var expires = "expires=" + d.toUTCString();

    document.cookie = cookiename + "=new_value;path=/;" + expires
    return document.cookie.indexOf(cookiename + '=') == -1;
}