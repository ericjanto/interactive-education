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
    const now = new Date()

    // entries which have date before or equal to now
    // {prompt_id:next_due_date}
    let promptDict = {}
    for (var i = 0; i < reviewHistory.items.length; i++) {
        let reviewRecord = reviewHistory.items.at(i)
        const promptID = reviewRecord.prompt_id
        const dueDate = new Date(reviewRecord.calculated_next_due)
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