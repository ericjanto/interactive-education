import { Feedback } from "./Feedback";
import { Flashcard } from "./Flashcard";
import { useState } from "react";


export default function ReviewItem({ promptID, front, back, onFeedback }) {
    const [showQuestion, setShowQuestion] = useState(true)

    return (
        <div className="review-item">
            <div className='review-area'>
                <Flashcard className='flashcard' front={front} back={back} showQuestion={showQuestion} setShowQuestion={setShowQuestion}></Flashcard>
                <Feedback className='feedback' promptID={promptID} onFeedback={onFeedback}></Feedback>
            </div>
        </div>

    )
}