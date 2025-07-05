import { KanbanColumn, KanbanItem } from "../Models/KanbanModels";
import { KanbanItemView } from "./KanbanBoardItem";
import styles from './KanbanBoard.module.css';

const KanbanStyleMap = {
    [KanbanColumn.NotStarted]: styles.kanbanColumnUnstarted,
    [KanbanColumn.InProgress]: styles.kanbanColumnInProgress,
    [KanbanColumn.InReview]: styles.kanbanColumnInReview,
    [KanbanColumn.Completed]: styles.kanbanColumnFinished,
    [KanbanColumn.Released]: styles.kanbanColumnReleased,
};

export function KanbanColumnView({
    column,
    items,
    claimItem
}: {
    column: KanbanColumn,
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

    const itemStyle = KanbanStyleMap[column];

    return (
        <div className={`${styles.kanbanColumnView} ${itemStyle}`}>
            <h3>Unstarted</h3>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className={styles.kanboardColumnBody}> {
                    items.map((item) => {
                        return <KanbanItemView key={item.id} item={item} />;
                    }
                )}
            </div>
        </div>
    );
}
