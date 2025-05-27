import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Switch,
    Divider,
    addToast
} from "@heroui/react";

const SettingsView: React.FC = () => {
    const [settings, setSettings] = useState({
        hotkey: 'F12',
        playerName: '',
        autoRefresh: true,
        notifications: true,
        theme: 'auto'
    });

    const handleSaveSettings = () => {
        // Sauvegarder les paramètres (à implémenter avec l'API)
        addToast({
            title: "Paramètres sauvegardés",
            description: "Vos paramètres ont été mis à jour avec succès",
            color: "success"
        });
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold">Paramètres</h2>
                </CardHeader>
                <CardBody className="space-y-6">
                    {/* Section Raccourcis */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Raccourcis clavier</h3>
                        <Input
                            label="Raccourci pour capture d'écran"
                            placeholder="F12"
                            value={settings.hotkey}
                            onValueChange={(value) => handleInputChange('hotkey', value)}
                            description="Touche pour déclencher l'analyse automatique"
                        />
                    </div>

                    <Divider />

                    {/* Section Joueur surveillé */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Joueur surveillé</h3>
                        <Input
                            label="Nom du joueur à surveiller"
                            placeholder="Entrez le nom du joueur"
                            value={settings.playerName}
                            onValueChange={(value) => handleInputChange('playerName', value)}
                            description="Le joueur dont vous voulez suivre les statistiques"
                        />
                    </div>

                    <Divider />

                    {/* Section Préférences */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Préférences</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Actualisation automatique</p>
                                    <p className="text-sm text-default-600">
                                        Actualiser automatiquement les données toutes les 2 minutes
                                    </p>
                                </div>
                                <Switch
                                    isSelected={settings.autoRefresh}
                                    onValueChange={(value) => handleInputChange('autoRefresh', value)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Notifications</p>
                                    <p className="text-sm text-default-600">
                                        Recevoir des notifications pour les événements importants
                                    </p>
                                </div>
                                <Switch
                                    isSelected={settings.notifications}
                                    onValueChange={(value) => handleInputChange('notifications', value)}
                                />
                            </div>
                        </div>
                    </div>

                    <Divider />

                    {/* Bouton de sauvegarde */}
                    <div className="flex justify-end">
                        <Button
                            color="primary"
                            size="lg"
                            onPress={handleSaveSettings}
                        >
                            Sauvegarder les paramètres
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export { SettingsView };