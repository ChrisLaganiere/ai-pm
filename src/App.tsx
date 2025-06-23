import { useState } from "react";
import './Design/theme.css';
import { KanbanBoardView } from './Components/KanbanBoard';
import { demoFixtures } from './Fixtures/demoFixtures';
import { formatBoard, KanbanColumn } from "./Models/KanbanModels";

function App() {
  const [items, setItems] = useState(demoFixtures())

  function moveItem(itemId: string, to: KanbanColumn) {
    setItems(items.map(i => {
      if (i.id === itemId) {
        i.column = to;
      }
      return i;
    }))
  }

  return (
    <div className="App">
      <KanbanBoardView board={formatBoard(items)} moveItem={moveItem} />
    </div>
  );
}

export default App;
