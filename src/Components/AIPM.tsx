import styles from './AIPM.module.css';
import stalin from '../Resources/stalin-pm.png';
import { useEffect, useState } from 'react';

export function AIPM() {

    const [speech, setSpeech] = useState('Well, is that the best you can do?');

    useEffect(() => {
        const interval = setInterval(() => {
            setSpeech('ay?')
        }, 5000)
        return () => clearInterval(interval);
    }, [])

    return (
        <div className={styles.aiPm}>
            <div className={styles.aiPmCartoon}>
            <img src={stalin} alt="ai pm cartoon" />
            </div>
            <div className={styles.aiPmSpeech}>
            {speech}
            </div>
        </div>
    );
}