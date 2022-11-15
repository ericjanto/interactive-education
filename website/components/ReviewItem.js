import { Feedback } from "./Feedback";
import { Flashcard } from "./Flashcard";
import { Statusbar } from "./Statusbar";
import { Topbar } from "./Topbar";

export default function ReviewItem({ promptID, front, back }) {
    return (
        <div className="review-item">
            <Topbar></Topbar>
            <Statusbar></Statusbar>
            <div className='review-area'>
                <Flashcard className='flashcard' front={front} back={back}></Flashcard>
                <Feedback className='feedback' promptID={promptID} onFeedback={() => { }}></Feedback>
            </div>
        </div>
    )
}