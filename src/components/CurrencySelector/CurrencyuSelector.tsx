"use client";

import { FC } from "react";

interface Currency {
  code: string;
  label: string;
}

interface CurrencySelectorProps {
  currencies: Currency[];
  setCurrency: (currency: string) => void;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({
  currencies,
  setCurrency,
}) => {
  return (
    <div className="mb-5 flex gap-4 justify-center">
      {currencies.map((currency) => (
        <button
          key={currency.code}
          onClick={() => setCurrency(currency.code)}
          className="btn btn-primary"
        >
          {currency.label}
        </button>
      ))}
    </div>
  );
};

export default CurrencySelector;
