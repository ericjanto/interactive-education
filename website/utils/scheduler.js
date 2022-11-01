import { addDays, daysBetweenDates } from "./lib"

export function leitnerSchedule(result) {
    if (result.totalItems == 0) {
        return addDays(new Date(), 1)
    } else if (result.totalItems == 1) {
        return addDays(new Date(), 2)
    } else {
        const most_recent_due_date = new Date(result.items.at(0).calculated_next_due)
        const previous_due_date = new Date(result.items.at(1).calculated_next_due)
        const add = daysBetweenDates(previous_due_date, most_recent_due_date) * 2
        return addDays(new Date(), add)
    }
}