import React, { useState, useEffect } from 'react';
import { Card, CardBody } from "@heroui/react";

interface TimerProps {
    isRunning: boolean;
    isComplete: boolean;
    startTime?: number;
    className?: string;
}

const Timer: React.FC<TimerProps> = ({
                                         isRunning,
                                         isComplete,
                                         startTime,
                                         className = ""
                                     }) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        let intervalId: NodeJS.Timeout;

        if (isRunning && startTime) {
            intervalId = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 100);
        } else if (!isRunning) {
            setElapsedTime(0);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, startTime]);

    const formatTime = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    };

    const getTimerColor = (): string => {
        if (isComplete) return 'text-success';
        if (isRunning) return 'text-primary';
        return 'text-default-500';
    };

    const getBackgroundColor = (): string => {
        if (isComplete) return 'bg-success/10';
        if (isRunning) return 'bg-primary/10';
        return 'bg-default-100';
    };

    return (
        <Card className={`${className} ${getBackgroundColor()}`}>
            <CardBody className="flex flex-row items-center justify-center p-4">
                <div className="flex items-center gap-3">
                    {isRunning && (
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    )}
                    {isComplete && (
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                    )}
                    <span className={`font-mono text-2xl font-bold ${getTimerColor()}`}>
            {formatTime(elapsedTime)}
          </span>
                    <span className={`text-sm ${getTimerColor()}`}>
            {isRunning ? 'Analyse en cours...' :
                isComplete ? 'Analyse terminée' :
                    'En attente'}
          </span>
                </div>
            </CardBody>
        </Card>
    );
};

export default Timer;