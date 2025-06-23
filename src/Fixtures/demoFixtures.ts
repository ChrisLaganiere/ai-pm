import { KanbanColumn, KanbanItem } from "../Models/KanbanModels";

function demoItem(): KanbanItem {
    return {
        id: 'I-AM-UNIQUE',
        title: 'build a board',
        description: 'just get started!',
        points: 3,
        column: KanbanColumn.NotStarted
    };
}

/**
 * Generates an example starting Kanban board.
 */
export function demoFixtures(): KanbanItem[] {
    return [demoItem()]
}
