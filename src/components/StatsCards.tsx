// src/components/StatsCards.tsx
import React from 'react';
import { Card, CardBody } from "@heroui/react";
import type {ServerStats} from '../types';

interface StatsCardProps {
  title: string;
  value: number;
  type: 'cheater' | 'very_sus' | 'sus' | 'legit';
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, type, isLoading = false }) => {
  const getCardStyles = () => {
    switch (type) {
      case 'cheater':
        return {
          bg: 'bg-danger/10',
          border: 'border-danger/20',
          text: 'text-danger',
          icon: '🚫'
        };
      case 'very_sus':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          text: 'text-warning',
          icon: '⚠️'
        };
      case 'sus':
        return {
          bg: 'bg-warning/20',
          border: 'border-warning/30',
          text: 'text-warning-600',
          icon: '❓'
        };
      case 'legit':
        return {
          bg: 'bg-success/10',
          border: 'border-success/20',
          text: 'text-success',
          icon: '✅'
        };
      default:
        return {
          bg: 'bg-default/10',
          border: 'border-default/20',
          text: 'text-default',
          icon: '👤'
        };
    }
  };

  const styles = getCardStyles();

  return (
      <Card className={`${styles.bg} ${styles.border} border-2`}>
        <CardBody className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-default-600">{title}</p>
              <p className={`text-3xl font-bold ${styles.text}`}>
                {isLoading ? (
                    <span className="animate-pulse">---</span>
                ) : (
                    value
                )}
              </p>
            </div>
            <div className="text-3xl opacity-80">
              {styles.icon}
            </div>
          </div>
        </CardBody>
      </Card>
  );
};

interface StatsCardsProps {
  stats: ServerStats;
  isLoading?: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, isLoading = false }) => {
  return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
            title="Tricheurs"
            value={stats.cheaters}
            type="cheater"
            isLoading={isLoading}
        />
        <StatsCard
            title="Très suspects"
            value={stats.verySus}
            type="very_sus"
            isLoading={isLoading}
        />
        <StatsCard
            title="Suspects"
            value={stats.sus}
            type="sus"
            isLoading={isLoading}
        />
        <StatsCard
            title="Légitimes"
            value={stats.legit}
            type="legit"
            isLoading={isLoading}
        />
      </div>
  );
};

export default StatsCards;