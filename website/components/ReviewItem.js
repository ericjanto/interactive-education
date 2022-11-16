import { Feedback } from "./Feedback";
import { Flashcard } from "./Flashcard";
import { UserStatus } from "./LoginStatus";
import { Topbar } from "./Topbar";

export default function ReviewItem({ promptID, front, back }) {
    return (
        <div className="review-item">
            <UserStatus></UserStatus>
            <Topbar></Topbar>
            <div className='review-area'>
                <Flashcard className='flashcard' front={front} back={back}></Flashcard>
                <Feedback className='feedback' promptID={promptID} onFeedback={() => { }}></Feedback>
            </div>
        </div>
    )
}