import { addDays, daysBetweenDates } from "./lib"

export function leitnerSchedule(result) {
    if (result.length == 0) {
        return addDays(new Date(), 1)
    } else if (result.length == 1) {
        return addDays(new Date(), 2)
    } else {
        const mostRecentDueDate = result[0].calculatedNextDue.toDate()
        const previousDueDate = result[1].calculatedNextDue.toDate()
        var add = daysBetweenDates(previousDueDate, mostRecentDueDate) * 2

        // This is the case if during deck review, not remembered and most recent due data = previous due date.
        if (add == 0) {
            add = 1
        }
        return addDays(new Date(), add)
    }
}