
import { CardTransaction, CardUsageData, Reward, RewardLevel } from "../types/bank";

// Mock datos de transacciones para el mes actual
export const generateMockTransactions = (month: Date): CardTransaction[] => {
  const transactions: CardTransaction[] = [];
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  
  // Usamos el mes y año especificados (mayo 2025)
  const currentMonth = 4; // mayo es 4 (0-based)
  const currentYear = 2025;
  
  // Generar entre 15-20 transacciones aleatorias para el mes
  const transactionCount = 18; // Fijamos el número de transacciones en 18
  
  const merchants = ["Mercado", "Restaurante", "Gasolinera", "Farmacia", "Tienda Online", "Cine", "Supermercado"];
  const categories = ["Comida", "Transporte", "Salud", "Entretenimiento", "Compras", "Servicios"];
  
  // Días usados (sin repetir)
  const usedDays = new Set<number>();
  
  for (let i = 0; i < transactionCount; i++) {
    // Asegurar días únicos para las transacciones (podrían haber varias transacciones por día)
    let day;
    if (usedDays.size < 18) { // Limitamos a 18 días con transacciones
      do {
        day = Math.floor(Math.random() * daysInMonth) + 1;
      } while (Math.random() < 0.3 && usedDays.has(day)); // 30% de probabilidad de reutilizar un día
      usedDays.add(day);
    } else {
      day = Array.from(usedDays)[Math.floor(Math.random() * usedDays.size)];
    }
    
    const transactionDate = new Date(currentYear, currentMonth, day);
    const transactionAmount = Math.round((Math.random() * 190 + 10) * 100) / 100; // Entre $10 y $200
    
    transactions.push({
      id: `trans-${i}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      date: transactionDate,
      amount: transactionAmount,
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      description: Math.random() > 0.3 ? `Compra en ${merchants[Math.floor(Math.random() * merchants.length)]}` : undefined
    });
  }
  
  // Ordenar transacciones por fecha
  return transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
};

// Obtener datos de uso de la tarjeta para un mes específico
export const getCardUsageData = (month: Date = new Date()): CardUsageData => {
  // Forzar a mayo 2025
  const mayoDate = new Date(2025, 4, 1);
  const transactions = generateMockTransactions(mayoDate);
  
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
    currentMonth: mayoDate
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
