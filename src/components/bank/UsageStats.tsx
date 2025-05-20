import React from 'react';
import { CalendarCheck, CircleCheck, Award } from 'lucide-react';
import { Reward } from '../../types/bank';

interface UsageStatsProps {
  usedDaysCount: number;
  totalTransactions: number;
  daysInMonth: number;
  reward: Reward;
}

const UsageStats = ({ usedDaysCount, totalTransactions, daysInMonth, reward }: UsageStatsProps) => {
  const progressPercentage = Math.round((usedDaysCount / daysInMonth) * 100);

  // Color basado en el nivel de recompensa
  const getRewardColor = () => {
    switch(reward.level) {
      case 'premium': return 'bg-yellow-500';
      case 'medium': return 'bg-blue-500';
      case 'basic': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };
  
  // Icono basado en el nivel de recompensa
  const getIconSize = () => {
    switch(reward.level) {
      case 'premium': return 'text-yellow-500 animate-pulse-light';
      case 'medium': return 'text-blue-500';
      case 'basic': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-5 mt-4">
      <div className="flex gap-6 flex-wrap">
        <div className="count-badge bg-bank-primary">
          <CalendarCheck className="h-4 w-4 text-bank-primary" />
          <span className="text-sm font-medium text-bank-dark">
            {usedDaysCount} días de uso
          </span>
        </div>
      </div>

      {/* Progreso del mes */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Progreso del mes</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-bank-secondary transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Sección de recompensas */}
      <div className="pt-3 border-t">
        <div className="flex items-center mb-3">
          <Award className={`mr-2 h-5 w-5 ${getIconSize()}`} />
          <h3 className="font-medium">Recompensas del mes</h3>
        </div>
        
        <div className={`p-4 rounded-lg ${reward.miles > 0 ? 'bg-opacity-10' : 'bg-gray-100'} ${getRewardColor()}`}>
          <div className="flex justify-between items-center">
            <span className="text-sm">{reward.description}</span>
            <span className="font-bold">{reward.miles} millas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageStats;
