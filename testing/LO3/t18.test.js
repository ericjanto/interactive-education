import { jest } from '@jest/globals'

import { leitnerSchedule } from '../../website/utils/scheduler.js';
import syntheticInputs from '../LO2/T14/relevant-input-values.json';


test('(leitnerSchedule) performs well for full review history', () => {
    const mostRecentDueDate = new Date(syntheticInputs.results_2[0].calculatedNextDue)
    const previousDueDate = new Date(syntheticInputs.results_2[1].calculatedNextDue)

    const parsedDates = [
        {
            "calculatedNextDue": mostRecentDueDate
        },
        {
            "calculatedNextDue": previousDueDate
        }
    ]

    jest.useFakeTimers();

    const start = performance.now();
    const result = leitnerSchedule(parsedDates)
    const end = performance.now();

    expect(end - start).toBeLessThan(100);
});


test('(leitnerSchedule) performs well for partial review history', () => {
    jest.useFakeTimers();

    const start = performance.now();
    const result = leitnerSchedule(syntheticInputs.results_1)
    const end = performance.now();

    expect(end - start).toBeLessThan(100);
});

test('(leitnerSchedule) performs well for empty review history', () => {
    jest.useFakeTimers();

    const start = performance.now();
    const result = leitnerSchedule(syntheticInputs.results_0)
    const end = performance.now();

    expect(end - start).toBeLessThan(100);
});