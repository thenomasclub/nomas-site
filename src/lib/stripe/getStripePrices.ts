import Stripe from "stripe";

const stripe = new Stripe(process.env.SITE_STRIPE_SECRET_KEY!);

export async function getStripePrices() {
  const products = await stripe.products.list({ active: true });
  const prices = await stripe.prices.list({ active: true, expand: ["data.product"] });

  return prices.data.map((price) => {
    const product = price.product as Stripe.Product;
    return {
      id: price.id,
      product: product.name,
      unit_amount: price.unit_amount,
      currency: price.currency,
      interval: price.recurring?.interval,
    };
  });
}
