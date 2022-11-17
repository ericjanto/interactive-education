import { UserStatus } from "./LoginStatus"

export function Topbar({ n, total, status }) {
    if (!n && n != 0) n = '?'
    if (!total) total = '?'

    var statusText

    switch (status) {
        case 1: statusText = 'Review what you just saw in the video.'
            break
        case 2: statusText = 'Watch the video to activate questions.'
            break
        case 3: statusText = 'All questions answered.'
            break
        default: statusText = 'Unexpected status for Topbar component'
    }

    return (
        <div className='topbar'>
            <div className="topbar-info information">{statusText}</div>
            <div className="topbar-status">{n}/{total}</div>
            <UserStatus></UserStatus>
        </div>
    )
}