import React from 'react';
import { CardTransaction } from '../../types/bank';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '../ui/badge';

interface TransactionsListProps {
  transactions: CardTransaction[];
  selectedDate?: Date;
}

const TransactionsList = ({ transactions, selectedDate }: TransactionsListProps) => {
  // Filtrar transacciones por fecha si hay una fecha seleccionada
  const filteredTransactions = selectedDate
    ? transactions.filter(
        (transaction) =>
          transaction.date.getDate() === selectedDate.getDate() &&
          transaction.date.getMonth() === selectedDate.getMonth() &&
          transaction.date.getFullYear() === selectedDate.getFullYear()
      )
    : transactions;

  if (filteredTransactions.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        {selectedDate 
          ? "No hay transacciones para este día." 
          : "No hay transacciones para mostrar."}
      </div>
    );
  }

  // Función para obtener color según categoría
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'comida': return 'bg-custom-pink';
      case 'transporte': return 'bg-custom-blueDark';
      case 'salud': return 'bg-custom-aqua';
      case 'entretenimiento': return 'bg-custom-lilac';
      case 'compras': return 'bg-custom-lime';
      case 'servicios': return 'bg-custom-blue';
      default: return 'bg-custom-white';
    }
  };

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
      <h3 className="font-medium text-sm text-gray-500 mb-2">
        {selectedDate
          ? `Transacciones del ${format(selectedDate, 'd MMMM', { locale: es })}`
          : 'Transacciones recientes'}
      </h3>
      
      {filteredTransactions.map((transaction) => (
        <div 
          key={transaction.id} 
          className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-sm">{transaction.merchant}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={`${getCategoryColor(transaction.category)} text-white text-xs py-0 h-5`}>
                  {transaction.category}
                </Badge>
              </div>
            </div>
            <span className="font-semibold">
              ${transaction.amount.toFixed(2)}
            </span>
          </div>
          {/* {transaction.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{transaction.description}</p>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;
