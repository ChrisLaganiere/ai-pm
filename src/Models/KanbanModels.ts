/**
 * Available columns on kanban board.
 */
export enum KanbanColumn {
    NotStarted,
    InProgress,
    InReview,
    Completed,
    Released
}

/**
 * One item in a kanban board.
 */
export interface KanbanItem {
    id: string;
    title: string;
    description: string;
    points: number;
    column: KanbanColumn;
}

/**
 * A full board of Kanban items.
 */
export interface KanbanBoard {
    notStarted: KanbanItem[];
    inProgress: KanbanItem[];
    inReview: KanbanItem[];
    completed: KanbanItem[];
    released: KanbanItem[];
}

/**
 * Generate formatted view of data items.
 */
export function formatBoard(items: KanbanItem[]): KanbanBoard {
    return {
        notStarted: items.filter(i => i.column === KanbanColumn.NotStarted),
        inProgress: items.filter(i => i.column === KanbanColumn.InProgress),
        inReview: items.filter(i => i.column === KanbanColumn.InReview),
        completed: items.filter(i => i.column === KanbanColumn.Completed),
        released: items.filter(i => i.column === KanbanColumn.Released),
    }
}
