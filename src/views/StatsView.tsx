import React from 'react';
import { Card, CardBody, CardHeader } from "@heroui/react";

const StatsView: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold">Statistiques</h2>
                </CardHeader>
                <CardBody>
                    <p className="text-lg text-default-600">
                        Cette section affichera les statistiques détaillées des joueurs surveillés.
                    </p>
                    <p className="text-sm text-default-400 mt-4">
                        Fonctionnalité en cours de développement...
                    </p>
                </CardBody>
            </Card>
        </div>
    );
};

export default StatsView;