import { useState } from "react";
import { KanbanBoardView } from './Components/KanbanBoard';
import { demoFixtures } from './Fixtures/demoFixtures';
import { formatBoard, KanbanColumn } from "./Models/KanbanModels";
import './theme.css';
import styles from './App.module.css';
import stalin from './Resources/stalin-pm.png';

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
    <div className={`App ${styles.KanbanHeaderView}`}>
      <div className={styles.aiPm}>
        <div className={styles.aiPmCartoon}>
          <img src={stalin} alt="ai pm cartoon" />
        </div>
        <div className={styles.aiPmSpeech}>
          Well, is that the best you can do?
        </div>
      </div>
      <KanbanBoardView board={formatBoard(items)} moveItem={moveItem} />
    </div>
  );
}

export default App;
