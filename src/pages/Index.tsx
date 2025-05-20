
import { CreditCardUsage } from '@/components/bank/CreditCardUsage';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bank-light to-white p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-bank-dark mb-2">
            Banco Digital
          </h1>
          <p className="text-gray-600">
            Seguimiento de uso de tu tarjeta de crédito
          </p>
        </header>
        <CreditCardUsage />
      </div>
    </div>
  );
};

export default Index;
