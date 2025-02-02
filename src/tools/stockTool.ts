import { createTool } from "@mastra/core";
import { z } from "zod";

export const stockTool = createTool({
    id: "Get Stock Price",
    description: "Get the current stock price for a given stock symbol",
    inputSchema: z.object({
        symbol: z.string().describe("Stock Ticker Symbol"),
    }),
    outputSchema: z.object({
        symbol: z.string(),
        currentPrice: z.string()
    }),
    execute: async ({ context: { symbol } }) => {
        console.log(`Checking Stock Price for Symbol ${symbol}`)
        return {
            symbol,
            currentPrice: await getStockPrice(symbol),
        }
    },
});

// DO API MAGIC HERE
const getStockPrice = async (symbol: string) => {
    const data = await fetch(
      `https://mastra-stock-data.vercel.app/api/stock-data?symbol=${symbol}`,
    ).then((r) => r.json());
    console.debug(data)
    return data.prices["4. close"];
  };