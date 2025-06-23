import { KanbanBoard,KanbanColumn,KanbanItem } from "../Models/KanbanModels";
import styles from './KanbanBoard.module.css';

function KanbanItemView({
    item
}: {
    item: KanbanItem;
}) {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', item.id);
    };
    
    return (
        <div draggable onDragStart={handleDragStart} className={styles.kanbanItem}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.points}</p>
        </div>
    )
}

function KanbanColumnView({
    items,
    claimItem
}: {
    items: KanbanItem[];
    claimItem: (itemId: string) => void
}) {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData('text/plain');
        console.log(`did drop item: ${itemId}`)
        claimItem(itemId);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Allow dropping
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={styles.kanboardColumn}> {
                items.map((item) => {
                    return <KanbanItemView item={item} />;
                }
            )}
        </div>
    );
}

export function KanbanBoardView({
    board,
    moveItem
}: {
    board: KanbanBoard;
    moveItem: (itemId: string, to: KanbanColumn) => void
}) {
    return (
        <div className={styles.kanboardBoard}>
            <KanbanColumnView items={board.notStarted} claimItem={(itemId) => moveItem(itemId, KanbanColumn.NotStarted)} />
            <KanbanColumnView items={board.inProgress} claimItem={(itemId) => moveItem(itemId, KanbanColumn.InProgress)} />
            <KanbanColumnView items={board.inReview} claimItem={(itemId) => moveItem(itemId, KanbanColumn.InReview)} />
            <KanbanColumnView items={board.completed} claimItem={(itemId) => moveItem(itemId, KanbanColumn.Completed)} />
            <KanbanColumnView items={board.released} claimItem={(itemId) => moveItem(itemId, KanbanColumn.Released)} />
        </div>
    );
}
