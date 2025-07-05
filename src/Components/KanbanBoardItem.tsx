import { KanbanItem } from "../Models/KanbanModels";
import styles from './KanbanBoard.module.css';

export function KanbanItemView({
    item
}: {
    item: KanbanItem;
}) {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', item.id);
    };
    
    return (
        <div draggable onDragStart={handleDragStart} className={styles.kanbanItem}>
            <div className={styles.kanbanItemHeader}></div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.points}</p>
        </div>
    )
}
