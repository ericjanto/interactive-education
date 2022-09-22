import { InteractiveElement } from './InteractiveElement'

/**
 * Attempts to extract a video element from the enclosing parent HTML
 * element. If multiple video elements are found, the first one only
 * is returned.
 *
 * @param {HTMLElement} parent is the enclosing HTML element
 * @returns the first found video element, or null if there are
 *          none
 */
export function extractVideo(parent) {
    const queryElement = parent.querySelector(':scope > video')
    if (queryElement instanceof HTMLVideoElement) {
        return queryElement
    } else {
        return null
    }
}

/**
 * Attempts to extract all InteractiveElements from the enclosing
 * parent HTML element.
 *
 * @param {HTMLElement} parent is the enclosing HTML element
 * @returns Potentially empty dictionary with an integer value
 *          converted from an InteractiveElement's timestamp,
 *          and the InteractiveElement as value itself
 */
export function extractTimedInteractiveElements(parent) {
    const timedElements = {}
    parent.querySelectorAll(':scope > interactive-element').forEach((element) => {
        if (element instanceof InteractiveElement) {
            const s = timestampToSeconds(element.timestamp)
            if (s) {
                timedElements[s] = element
            }
        }
    })
    return timedElements
}

/**
 * Utility function to convert a timestamp into seconds.
 *
 * @param {string} timestamp, expected in the format of 'hh:mm:ss'
 * @returns all values in timestamp converted and summed up to seconds.
 *          If invalid @param timestamp, returns NaN
 */
function timestampToSeconds(timestamp) {
    // Native JavaScript does not support timestamps out of the box;
    // the workaround with Date() is a bit of a hack
    const dateString = Date.parse('1970-01-01T' + timestamp + 'Z')
    if (dateString) {
        const seconds = parseInt(new Date(dateString).getTime() / 1000)
        return seconds
    } else {
        return NaN
    }
}
