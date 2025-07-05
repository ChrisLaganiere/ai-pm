import { KanbanColumn, KanbanItem } from "../Models/KanbanModels";

function demoItem({
    title,
}: {
    title: string;
}): KanbanItem {
    return {
        id: crypto.randomUUID(),
        title: title,
        description: 'just get started!',
        points: 3,
        column: KanbanColumn.NotStarted
    };
}

/**
 * Generates an example starting Kanban board.
 */
export function demoFixtures(): KanbanItem[] {
    return [
        demoItem({ title: 'A' }),
        demoItem({ title: 'B' }),
        demoItem({ title: 'C' }),
    ]
}
