export interface CreatePaymentUrl {
  amount: number;
  doctorId: string;
  description: string;
}

export interface CurrencyConversionParams {
  api_key: string;
  format: string;
  from: string;
  to: string;
  amount: number;
}

export interface CurrencyConversionResult {
  base_currency_code: string;
  base_currency_name: string;
  amount: string;
  rates: {
    USD: {
      currency_name: string;
      rate: string;
      rate_for_amount: string;
    };
  };
  status: string;
}
