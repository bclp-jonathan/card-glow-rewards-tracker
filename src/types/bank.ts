
// Transacción de tarjeta de crédito
export interface CardTransaction {
  id: string;
  date: Date;
  amount: number;
  merchant: string;
  category: string;
  description?: string;
}

// Datos de uso de la tarjeta para el mes
export interface CardUsageData {
  transactions: CardTransaction[];
  usedDays: Date[];
  totalTransactions: number;
  currentMonth: Date;
}

// Nivel de recompensa según el uso
export type RewardLevel = 'none' | 'basic' | 'medium' | 'premium';

// Recompensa por uso de tarjeta
export interface Reward {
  level: RewardLevel;
  miles: number;
  description: string;
}
