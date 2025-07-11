import styles from './AIPM.module.css';
import stalin from '../Resources/stalin-pm.png';
import { useEffect, useState } from 'react';
import { PMChatDataPoints, reportBoardStatus } from '../Models/PMChatModels';
import { KanbanBoard } from '../Models/KanbanModels';

export function AIPM({
    board,
}: {
    board: KanbanBoard;
}) {

    const [speech, setSpeech] = useState('Well, is that the best you can do?');
    const [, setLastStatusReportTime] = useState(new Date());
    const [timeSinceLastStatusReportTime, setTimeSinceLastStatusReportTime] = useState(0);
    const [statusReport, setStatusReport] = useState(PMChatDataPoints.initial())

    useEffect(() => {
        setLastStatusReportTime((last) => {
            const now = new Date();
            setTimeSinceLastStatusReportTime((last.getTime() - now.getTime()) / 1000);
            return now;
        })
    }, [board])

    useEffect(() => {
        // Debounce by 100s
        const debounceTimeout = setTimeout(() => {
            const status = reportBoardStatus(board, (timeSinceLastStatusReportTime) / 1000);
            setStatusReport(status);
        }, 100);

        return () => clearTimeout(debounceTimeout);
    }, [board, timeSinceLastStatusReportTime])

    useEffect(() => {
        setSpeech(`ay? only ${statusReport.tasksCompleted + statusReport.tasksReleased} things done?`);
        const interval = setInterval(() => {
            setSpeech(`think you can do a little better than ${statusReport.tasksCompleted + statusReport.tasksReleased} things?`);
        }, 5000)
        return () => clearInterval(interval);
    }, [statusReport])

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