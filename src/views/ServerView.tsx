import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    addToast
} from "@heroui/react";
import Timer from '../components/Timer';
import StatsCards from '../components/StatsCards';
import PlayersTable from '../components/PlayersTable';
import type { ServerInfo, ServerStats, PlayerStats, AnalysisState } from '../types';

const ServerView: React.FC = () => {
    const [serverInput, setServerInput] = useState<string>("");
    const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
    const [serverStats, setServerStats] = useState<ServerStats>({
        totalPlayers: 0,
        cheaters: 0,
        verySus: 0,
        sus: 0,
        legit: 0
    });
    const [players, setPlayers] = useState<PlayerStats[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [analysisState, setAnalysisState] = useState<AnalysisState>({
        isAnalyzing: false,
        isComplete: false
    });

    // Simulation des données pour la démo
    const mockServerStats: ServerStats = {
        totalPlayers: 64,
        cheaters: 3,
        verySus: 5,
        sus: 8,
        legit: 48
    };

    const mockPlayers: PlayerStats[] = [
        { id: 1, name: "PlayerOne", kd: 3.2, kpm: 2.8, accuracy: "28%", rank: 150, status: "cheater" },
        { id: 2, name: "GoodPlayer", kd: 1.8, kpm: 1.2, accuracy: "22%", rank: 45, status: "legit" },
        { id: 3, name: "SusPlayer", kd: 2.9, kpm: 2.1, accuracy: "31%", rank: 89, status: "very_sus" },
        { id: 4, name: "RegularGuy", kd: 1.1, kpm: 0.9, accuracy: "18%", rank: 23, status: "legit" },
        { id: 5, name: "WeirdStats", kd: 2.2, kpm: 1.8, accuracy: "25%", rank: 67, status: "sus" },
    ];

    const handleStartAnalysis = async () => {
        if (!serverInput.trim()) {
            addToast({
                title: "Erreur",
                description: "Veuillez entrer un numéro de serveur",
                color: "danger"
            });
            return;
        }

        setAnalysisState({
            isAnalyzing: true,
            isComplete: false,
            startTime: Date.now()
        });

        // Simulation d'une analyse (remplacer par l'API réelle)
        try {
            // Simulation de la récupération des infos serveur
            setTimeout(() => {
                setServerInfo({
                    shortId: serverInput,
                    longId: "123456789",
                    name: `Server #${serverInput}`
                });
            }, 1000);

            // Simulation de l'analyse complète
            setTimeout(() => {
                setServerStats(mockServerStats);
                setPlayers(mockPlayers);
                setAnalysisState(prev => ({
                    ...prev,
                    isAnalyzing: false,
                    isComplete: true,
                    endTime: Date.now()
                }));

                addToast({
                    title: "Analyse terminée",
                    description: `Serveur #${serverInput} analysé avec succès`,
                    color: "success"
                });
            }, 5000);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setAnalysisState({
                isAnalyzing: false,
                isComplete: false,
                error: "Erreur lors de l'analyse"
            });

            addToast({
                title: "Erreur d'analyse",
                description: "Impossible d'analyser le serveur",
                color: "danger"
            });
        }
    };

    const handlePlayerClick = (player: PlayerStats) => {
        // Ouvrir le lien vers BFVHackers (à implémenter)
        const url = `https://bfvhackers.com/?player-id=${player.playerId || player.id}`;
        window.open(url, '_blank');
    };

    const handleToggleFavorite = (playerId: number) => {
        setFavorites(prev =>
            prev.includes(playerId)
                ? prev.filter(id => id !== playerId)
                : [...prev, playerId]
        );
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* En-tête avec paramètres d'analyse */}
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold">Analyse de serveur</h2>
                </CardHeader>
                <CardBody>
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <Input
                            label="Numéro de serveur"
                            placeholder="Entrez le numéro du serveur (ex: 1234)"
                            value={serverInput}
                            onValueChange={setServerInput}
                            className="flex-1"
                            isDisabled={analysisState.isAnalyzing}
                        />

                        {serverInfo && (
                            <Input
                                label="Nom du serveur"
                                value={serverInfo.name || ""}
                                isReadOnly
                                className="flex-1"
                            />
                        )}

                        <Button
                            color="primary"
                            size="lg"
                            isLoading={analysisState.isAnalyzing}
                            onPress={handleStartAnalysis}
                            spinner={
                                <svg
                                    className="animate-spin h-5 w-5 text-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        fill="currentColor"
                                    />
                                </svg>
                            }
                        >
                            {analysisState.isAnalyzing ? "Analyse en cours..." : "Démarrer l'analyse"}
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* Timer */}
            {(analysisState.isAnalyzing || analysisState.isComplete) && (
                <Timer
                    isRunning={analysisState.isAnalyzing}
                    isComplete={analysisState.isComplete}
                    startTime={analysisState.startTime}
                />
            )}

            {/* Cartes de statistiques */}
            {(analysisState.isAnalyzing || analysisState.isComplete) && (
                <StatsCards
                    stats={serverStats}
                    isLoading={analysisState.isAnalyzing}
                />
            )}

            {/* Table des joueurs */}
            {(analysisState.isAnalyzing || analysisState.isComplete) && (
                <Card>
                    <CardHeader>
                        <h3 className="text-xl font-semibold">Joueurs détectés</h3>
                    </CardHeader>
                    <CardBody>
                        <PlayersTable
                            players={players}
                            isLoading={analysisState.isAnalyzing}
                            onPlayerClick={handlePlayerClick}
                            onToggleFavorite={handleToggleFavorite}
                            favorites={favorites}
                        />
                    </CardBody>
                </Card>
            )}
        </div>
    );
};

export default ServerView;