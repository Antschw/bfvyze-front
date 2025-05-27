import React, { useState } from 'react';
import CustomNavbar from './components/CustomNavbar.tsx';
import ServerView from './views/ServerView';
import StatsView from './views/StatsView';
import {SettingsView} from './views/SettingsView';
import type {ViewType} from './types';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('server');

    const renderCurrentView = () => {
        switch (currentView) {
            case 'server':
                return <ServerView />;
            case 'stats':
                return <StatsView />;
            case 'settings':
                return <SettingsView />;
            default:
                return <ServerView />;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <CustomNavbar
                currentView={currentView}
                onViewChange={setCurrentView}
            />
            <main className="pt-4">
                {renderCurrentView()}
            </main>
        </div>
    );
};

export default App;