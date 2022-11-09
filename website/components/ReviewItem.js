import { Feedback } from "./Feedback";
import { Flashcard } from "./Flashcard";

export default function ReviewItem({promptID, front, back}) {
    return (
        <div style={{ backgroundColor: "#fa863d", height: '400px', maxWidth: '700px' }}>
            <Flashcard front={front} back={back}></Flashcard>
            <Feedback promptID={promptID} onFeedback={() => {}}></Feedback>
        </div>
    )
}