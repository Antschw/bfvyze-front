export interface ServerInfo {
    shortId: string;
    longId?: string;
    name?: string;
}

export interface PlayerStats {
    id: number;
    name: string;
    kd: number;
    kpm: number;
    accuracy: string;
    rank: number;
    status: PlayerStatus;
    playerId?: number;
}

export type PlayerStatus = 'legit' | 'sus' | 'very_sus' | 'cheater';

export interface ServerStats {
    totalPlayers: number;
    cheaters: number;
    verySus: number;
    sus: number;
    legit: number;
}

export interface AnalysisState {
    isAnalyzing: boolean;
    isComplete: boolean;
    error?: string;
    startTime?: number;
    endTime?: number;
}

export type ViewType = 'server' | 'stats' | 'settings';

export interface ToastMessage {
    title: string;
    description: string;
    color: 'success' | 'danger' | 'warning' | 'default';
}