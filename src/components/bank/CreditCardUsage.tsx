import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import Calendar from './Calendar';
import UsageStats from './UsageStats';
import TransactionsList from './TransactionsList';
import { getCardUsageData, calculateRewards } from '../../services/cardUsageService';
import { CardUsageData } from '../../types/bank';
import { Separator } from '@/components/ui/separator';

const CreditCardUsage = () => {
  const [currentMonth] = useState(new Date());
  const [usageData, setUsageData] = useState<CardUsageData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [reward, setReward] = useState(calculateRewards([], currentMonth));
  
  useEffect(() => {
    // Cargar datos de uso al montar el componente
    const data = getCardUsageData(currentMonth);
    setUsageData(data);
    setReward(calculateRewards(data.usedDays, currentMonth));
  }, [currentMonth]);
  
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };
  
  if (!usageData) {
    return (
      <Card className="w-full max-w-md mx-auto animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className="h-10 w-10 bg-gray-100 rounded-full"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="glass-card overflow-hidden animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-bank-primary to-bank-secondary text-white">
          <CardTitle className="flex justify-between items-center">
            <span>Uso de tarjeta</span>
            <span className="text-sm font-normal">
              {format(currentMonth, 'MMMM yyyy', { locale: es })}
            </span>
          </CardTitle>
          <CardDescription className="text-gray-100">
            Seguimiento y recompensas
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          <div className="text-center text-xs text-gray-500 mb-2">Última actualización: 22 de mayo</div>
          <Calendar 
            currentMonth={currentMonth}
            usedDays={usageData.usedDays}
            onDayClick={handleDayClick}
          />
          
          <UsageStats
            usedDaysCount={usageData.usedDays.length}
            totalTransactions={usageData.totalTransactions}
            daysInMonth={daysInMonth}
            reward={reward}
          />
          
          <Separator />
          
          <TransactionsList 
            transactions={usageData.transactions}
            selectedDate={selectedDate}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditCardUsage;
