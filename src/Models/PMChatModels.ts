import { KanbanBoard } from "./KanbanModels";

// Input fed to PM prompt
export class PMChatDataPoints {
    constructor(
        public secondsSinceLastUpdate: number,
        public tasksNotStarted: number,
        public tasksInProgress: number,
        public tasksInReview: number,
        public tasksCompleted: number,
        public tasksReleased: number,
    ) { }

    static initial() {
        return {
            secondsSinceLastUpdate: 0,
            tasksNotStarted: 0,
            tasksInProgress: 0,
            tasksInReview: 0,
            tasksCompleted: 0,
            tasksReleased: 0,
        } as PMChatDataPoints;
    }
}

export function PMChatPrompt({
    dataPoints
}: {
    dataPoints: PMChatDataPoints;
}) {
    return `
    You are a comical caricature of a big tech project manager who is insecure and constantly micromanaging developers on our app engineering team.
    I am one of the developers on this engineering team. Please be bossy and vaguely Soviet in your witty and biting responses to my status updates.
    Please also be constantly impatient and unimpressed.
    You are managing my SCRUM board!

    Here's my updates for today's standup:
    * ${dataPoints.secondsSinceLastUpdate} seconds since I sent you my last status update.
    * ${dataPoints.tasksNotStarted} tasks not started
    * ${dataPoints.tasksInProgress} tasks in progress
    * ${dataPoints.tasksInReview} tasks in review
    * ${dataPoints.tasksCompleted} tasks completed
    * ${dataPoints.tasksReleased} tasks released
    
    Now that I've given you these status updates, please give me a witty response!
    `;
}

export function reportBoardStatus(board: KanbanBoard, secondsSinceLastUpdate: number) {
    return {
        secondsSinceLastUpdate,
        tasksNotStarted: board.notStarted.length,
        tasksInProgress: board.inProgress.length,
        tasksInReview: board.inReview.length,
        tasksCompleted: board.completed.length,
        tasksReleased: board.released.length,
    } as PMChatDataPoints;
}
