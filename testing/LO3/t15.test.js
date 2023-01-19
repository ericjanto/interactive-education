import { leitnerSchedule } from '../../website/utils/scheduler.js';
import syntheticInputs from '../LO2/T14/relevant-input-values.json';


test('(leitnerSchedule) Doubles previous interval and adds day at interval dist from today', () => {
    const mostRecentDueDate = new Date(syntheticInputs.results_2[0].calculatedNextDue)
    const previousDueDate = new Date(syntheticInputs.results_2[1].calculatedNextDue)

    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = mostRecentDueDate.getTime() - previousDueDate.getTime();
    var interval = Math.floor(millisBetween / millisecondsPerDay);

    const expected = new Date()
    expected.setDate(expected.getDate() + interval * 2)

    const parsedDates = [
        {
            "calculatedNextDue": mostRecentDueDate
        },
        {
            "calculatedNextDue": previousDueDate
        }
    ]
    const scheduled = leitnerSchedule(parsedDates)

    // Allow for leeway in ms order since dates are not created concurrently.
    const threshold = 100
    expect(Math.abs(expected - scheduled)).toBeLessThan(threshold);
});


test('(leitnerSchedule) Schedules empty review history for tomorrow', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const scheduled = leitnerSchedule(syntheticInputs.results_0)

    // Allow for leeway in ms order since dates are not created concurrently.
    const threshold = 100
    expect(Math.abs(tomorrow - scheduled)).toBeLessThan(threshold);
});

test('(leitnerSchedule) Schedules history with single item for in two days', () => {
    const expected = new Date();
    expected.setDate(expected.getDate() + 2);
    const scheduled = leitnerSchedule(syntheticInputs.results_1)

    // Allow for leeway in ms order since dates are not created concurrently.
    const threshold = 100
    expect(Math.abs(expected - scheduled)).toBeLessThan(threshold);
});