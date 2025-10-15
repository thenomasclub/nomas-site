import { NextResponse } from "next/server";
import { getStripePrices } from "@/src/lib/stripe/getStripePrices";

export async function GET() {
  const prices = await getStripePrices();
  return NextResponse.json(prices);
}
