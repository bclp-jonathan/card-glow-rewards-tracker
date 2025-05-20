import { CardTransaction, CardUsageData, Reward, RewardLevel } from "../types/bank";

// Mock datos de transacciones para el mes actual
export const generateMockTransactions = (month: Date): CardTransaction[] => {
  const transactions: CardTransaction[] = [];
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const currentMonth = month.getMonth();
  const currentYear = month.getFullYear();
  
  const merchants = ["Mercado", "Restaurante", "Gasolinera", "Farmacia", "Tienda Online", "Cine", "Supermercado"];
  const categories = ["Comida", "Transporte", "Salud", "Entretenimiento", "Compras", "Servicios"];
  
  // Primero, asegurar que cada día tenga al menos una transacción
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const amount = Math.round((Math.random() * 190 + 10) * 100) / 100; // Entre $10 y $200
    
    transactions.push({
      id: `trans-${day}-1-${Date.now()}`,
      date,
      amount,
      merchant,
      category,
      description: Math.random() > 0.3 ? `Compra en ${merchant}` : undefined
    });
  }
  
  // Agregar transacciones adicionales aleatorias (entre 0 y 5 por día)
  const additionalTransactions = Math.floor(Math.random() * 5); // 0-4 transacciones adicionales
  for (let i = 0; i < additionalTransactions; i++) {
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    const date = new Date(currentYear, currentMonth, day);
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const amount = Math.round((Math.random() * 190 + 10) * 100) / 100;
    
    transactions.push({
      id: `trans-${day}-2-${i}-${Date.now()}`,
      date,
      amount,
      merchant,
      category,
      description: Math.random() > 0.3 ? `Compra en ${merchant}` : undefined
    });
  }
  
  // Ordenar transacciones por fecha
  return transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
};

// Obtener datos de uso de la tarjeta para un mes específico
export const getCardUsageData = (month: Date = new Date()): CardUsageData => {
  const transactions = generateMockTransactions(month);
  
  // Obtener días únicos con uso de tarjeta
  const usedDaysSet = new Set<string>();
  transactions.forEach(trans => {
    usedDaysSet.add(trans.date.toISOString().split('T')[0]);
  });
  
  const usedDays = Array.from(usedDaysSet).map(dateStr => new Date(dateStr));
  
  return {
    transactions,
    usedDays,
    totalTransactions: transactions.length,
    currentMonth: month
  };
};

// Calcular recompensas según el uso de la tarjeta
export const calculateRewards = (usedDays: Date[], month: Date): Reward => {
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const uniqueDaysCount = usedDays.length;
  
  let level: RewardLevel;
  let miles: number;
  let description: string;
  
  if (uniqueDaysCount >= daysInMonth) {
    level = 'premium';
    miles = 2000;
    description = '¡Felicidades! Has utilizado tu tarjeta todos los días del mes.';
  } else if (uniqueDaysCount >= 20) {
    level = 'medium';
    miles = 1000;
    description = 'Has utilizado tu tarjeta más de 20 días este mes.';
  } else if (uniqueDaysCount >= 10) {
    level = 'basic';
    miles = 500;
    description = 'Has utilizado tu tarjeta más de 10 días este mes.';
  } else {
    level = 'none';
    miles = 0;
    description = 'Utiliza tu tarjeta más de 10 días para comenzar a ganar millas.';
  }
  
  return {
    level,
    miles,
    description
  };
};