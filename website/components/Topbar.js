import { UserStatus } from "./LoginStatus";


export function Topbar({n, total}) {
    if (!n) n = '?'
    if (!total) total = '?'
    return (
        <div className='topbar'>
            <div className="topbar-info information">Review what you just saw in the video.</div>
            <div className="topbar-status">{n}/{total}</div>
            <UserStatus></UserStatus>
        </div>
    )
}