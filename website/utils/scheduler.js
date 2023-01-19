import { addDays, daysBetweenDates } from "./lib.js"

export function leitnerSchedule(result) {
    /**
     * @param result is a sorted (by creation datetime) array of promptReview instances.
     *  Data fields of a promptReview instance include:
     *  - calculatedNextDue: next due date for the prompt
     */
    if (result.length == 0) {
        return addDays(new Date(), 1)
    } else if (result.length == 1) {
        return addDays(new Date(), 2)
    } else {
        var mostRecentDueDate
        var previousDueDate
        try {
            mostRecentDueDate = result[0].calculatedNextDue.toDate()
            previousDueDate = result[1].calculatedNextDue.toDate()
        } catch (e) {
            mostRecentDueDate = result[0].calculatedNextDue
            previousDueDate = result[1].calculatedNextDue
        }
        var add = daysBetweenDates(previousDueDate, mostRecentDueDate) * 2

        // This is the case if during deck review, not remembered and most recent due data = previous due date.
        if (add == 0) {
            add = 1
        }
        return addDays(new Date(), add)
    }
}