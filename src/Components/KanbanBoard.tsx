import { KanbanBoard,KanbanColumn } from "../Models/KanbanModels";
import { KanbanColumnView } from "./KanbanColumnView";
import styles from './KanbanBoard.module.css';

export function KanbanBoardView({
    board,
    moveItem
}: {
    board: KanbanBoard;
    moveItem: (itemId: string, to: KanbanColumn) => void
}) {
    return (
        <div className={styles.kanboardBoard}>
            <KanbanColumnView column={KanbanColumn.NotStarted} items={board.notStarted} claimItem={(itemId) => moveItem(itemId, KanbanColumn.NotStarted)} />
            <KanbanColumnView column={KanbanColumn.InProgress} items={board.inProgress} claimItem={(itemId) => moveItem(itemId, KanbanColumn.InProgress)} />
            <KanbanColumnView column={KanbanColumn.InReview} items={board.inReview} claimItem={(itemId) => moveItem(itemId, KanbanColumn.InReview)} />
            <KanbanColumnView column={KanbanColumn.Completed} items={board.completed} claimItem={(itemId) => moveItem(itemId, KanbanColumn.Completed)} />
            <KanbanColumnView column={KanbanColumn.Released} items={board.released} claimItem={(itemId) => moveItem(itemId, KanbanColumn.Released)} />
        </div>
    );
}
