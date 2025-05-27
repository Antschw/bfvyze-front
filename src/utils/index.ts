// src/utils/index.ts

/**
 * Formate un temps en millisecondes vers un format MM:SS.ms
 */
export const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
};

/**
 * Capitalise la première lettre d'une chaîne
 */
export const capitalize = (str: string): string => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
};

/**
 * Génère une URL vers BFVHackers pour un joueur
 */
export const getBFVHackersUrl = (playerId: number): string => {
    return `https://bfvhackers.com/?player-id=${playerId}`;
};

/**
 * Vérifie si un numéro de serveur est valide
 */
export const isValidServerId = (serverId: string): boolean => {
    // Vérifie que c'est un nombre entre 1000 et 9999
    const num = parseInt(serverId);
    return !isNaN(num) && num >= 1000 && num <= 9999;
};

/**
 * Formate un ratio K/D
 */
export const formatKD = (kd: number): string => {
    return kd.toFixed(2);
};

/**
 * Formate un ratio KPM
 */
export const formatKPM = (kpm: number): string => {
    return kpm.toFixed(2);
};

/**
 * Sauvegarde les favoris dans le localStorage
 */
export const saveFavorites = (favorites: number[]): void => {
    try {
        localStorage.setItem('bfvyze_favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
};

/**
 * Charge les favoris depuis le localStorage
 */
export const loadFavorites = (): number[] => {
    try {
        const saved = localStorage.getItem('bfvyze_favorites');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Error loading favorites:', error);
        return [];
    }
};

/**
 * Sauvegarde les paramètres dans le localStorage
 */
export const saveSettings = (settings: Record<string, never>): void => {
    try {
        localStorage.setItem('bfvyze_settings', JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
};

/**
 * Charge les paramètres depuis le localStorage
 */
export const loadSettings = (): Record<string, never> => {
    try {
        const saved = localStorage.getItem('bfvyze_settings');
        return saved ? JSON.parse(saved) : {};
    } catch (error) {
        console.error('Error loading settings:', error);
        return {};
    }
};