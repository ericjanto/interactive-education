import { Feedback } from "./Feedback";
import { Flashcard } from "./Flashcard";
import { Topbar } from "./Topbar";

export default function ReviewItem({ promptID, front, back, n, total, onFeedback }) {
    return (
        <div className="review-item">
            <Topbar n={n} total={total}></Topbar>
            <div className='review-area'>
                <Flashcard className='flashcard' front={front} back={back}></Flashcard>
                <Feedback className='feedback' promptID={promptID} onFeedback={onFeedback}></Feedback>
            </div>
        </div>

    )
}