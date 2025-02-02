
import { Agent } from "@mastra/core";
import * as tools from "../tools/stockTool"

export const stockAgent = new Agent({
    name: "Stock-Agent",
    instructions: "You are a helpful assistant that provides current stock prices. When asked about a stock, use the stock price tool to fetch the stock price.",
    model: {
        provider: "ANTHROPIC",
        name: "claude-3-5-sonnet-20241022",
        apiKey: process.env.ANTHROPIC_API_KEY
    },
    tools: {
        stockPrices: tools.stockTool,
    }
})

