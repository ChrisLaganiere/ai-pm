import { useState } from "react";
import styles from './Menu.module.css';

// Simple gear SVG icon
const GearIcon = ({ size = 24 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.06A1.65 1.65 0 0 0 9 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.06a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.06a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

export function OAITokenInput({
  token,
  setToken
} : {
  token: string;
  setToken: (token: string) => void
}) {

    const [expanded, setExpanded] = useState(false);

    return (
    <>
      {/* Floating Gear Icon */}
      <div
        onClick={() => setExpanded((o) => !o)}
        className={styles.menuGearButton}
      >
        <GearIcon />
      </div>

      {/* Slide-in panel */}
      <div
        style={{
          left: expanded ? 0 : -400,
          boxShadow: expanded ? '2px 0 5px rgba(0,0,0,0.1)' : 'none'
        }}
        className={styles.menuPanel}
      >
        <h4 style={{ marginTop: 0, fontSize: '1rem' }}>Settings</h4>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>OpenAI Token</label>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Open AI Token"
          className={styles.menuTokenField}
        />
        <button onClick={() => setToken('')} style={{ margin: '8pt 0' }} disabled={ token === '' }>Clear</button>
      </div>
    </>
  );
}
