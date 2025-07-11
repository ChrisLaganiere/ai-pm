import styles from './AIPM.module.css';
import stalin from '../Resources/stalin-pm.png';
import { useEffect, useState } from 'react';
import { buildPMChatSystemPrompt, PMChatDataPoints, reportBoardStatus } from '../Models/PMChatModels';
import { KanbanBoard } from '../Models/KanbanModels';

async function callChatCompletions({
    systemPrompt,
    apiToken,
    abort
}: {
    systemPrompt: string;
    apiToken: string;
    abort: AbortController;
}) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            },
            method: 'POST',
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{
                    role: 'system',
                    content: systemPrompt
                }],
                stream: true
            }),
            signal: abort.signal
        });
        const reply = (await response.json()).choices?.[0]?.message.content ?? 'Ehh, my system is down... please wait...';
        return reply
    } catch (e) {
        console.error(`error calling oai chat completions: ${e}`);
    }
}
export async function* callChatCompletionsStreaming({
  systemPrompt,
  apiToken,
  abort
}: {
  systemPrompt: string;
  apiToken: string;
  abort: AbortController;
}) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`,
            },
            method: 'POST',
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'system', content: systemPrompt }],
                stream: true,
            }),
            signal: abort.signal,
        });

        if (!response.ok || !response.body) {
            throw new Error(`OpenAI error: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        let partial = '';

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            partial += decoder.decode(value, { stream: true });

            for (const block of partial.split('\n\n')) {
                if (block.trim() === '') continue;
                if (!block.startsWith('data:')) continue;

                const payload = block.slice(6).trim();
                if (payload === '[DONE]') return;

                try {
                const json = JSON.parse(payload);
                const delta = json.choices?.[0]?.delta?.content;
                if (delta) {
                    yield delta;
                }
                } catch (err) {
                console.error('Malformed JSON:', payload);
                }
            }

            partial = '';
        }
    } catch (e) {
        console.error(`Error in streaming chat:`, e);
    }
}

export function AIPM({
    board,
    token,
}: {
    board: KanbanBoard;
    token: string;
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
        const abort = new AbortController()
        
        const updatePM = async () => {
            const stream = await callChatCompletionsStreaming({
                systemPrompt: buildPMChatSystemPrompt({ dataPoints: statusReport }),
                apiToken: token,
                abort
            });
            setSpeech('...');
            for await (const chunk of stream) {
                setSpeech((previous) => previous + chunk);
            }
        }

        setSpeech('...');
        updatePM();

        return () => {
            abort.abort("Cancelled");
        };
    }, [statusReport, token])

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