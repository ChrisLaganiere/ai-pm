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

    const title = (() => {
        switch(column) {
            case KanbanColumn.NotStarted:
                return "Not Started";
            case KanbanColumn.InProgress:
                return "In Progress";
            case KanbanColumn.InReview:
                return "In Review";
            case KanbanColumn.Completed:
                return "Completed";
            case KanbanColumn.Released:
                return "Released";
        }
    })();

    const itemStyle = KanbanStyleMap[column];

    return (
        <div className={`${styles.kanbanColumnView} ${itemStyle}`}>
            <h3>{title}</h3>
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
