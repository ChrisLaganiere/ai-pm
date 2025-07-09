import { useState } from "react";
import { KanbanBoardView } from './Components/KanbanBoard';
import { demoFixtures } from './Fixtures/demoFixtures';
import { formatBoard, KanbanColumn } from "./Models/KanbanModels";
import './theme.css';
import styles from './App.module.css';
import { AIPM } from "./Components/AIPM";
import { OAITokenInput } from "./Components/Menu";

function App() {
  const [items, setItems] = useState(demoFixtures())
  const [token, setToken] = useState('');

  function moveItem(itemId: string, to: KanbanColumn) {
    setItems(items.map(i => {
      if (i.id === itemId) {
        i.column = to;
      }
      return i;
    }))
  }

  return (
    <div className={`App ${styles.KanbanHeaderView}`}>
      <OAITokenInput token={token} setToken={setToken} />
      <AIPM />
      <KanbanBoardView board={formatBoard(items)} moveItem={moveItem} />
    </div>
  );
}

export default App;
