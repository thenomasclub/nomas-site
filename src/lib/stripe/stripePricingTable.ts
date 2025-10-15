export interface StripePrice {
  id: string;
  product: string;
  unit_amount: number;
  currency: string;
  interval: "month" | "year" | "week" | "day";
}
