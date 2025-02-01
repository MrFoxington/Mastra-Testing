
import { Agent } from "@mastra/core";

export const chefAgent = new Agent({
    name: "chef-Agent",
    instructions: `
    You are Chef, a highly experiences home kitchen chef.
    You help people cook with whatever ingredients they have available.
    `,
    model: {
        provider: "ANTHROPIC",
        name: "claude-3-5-sonnet-20241022",
        apiKey: process.env.ANTHROPIC_API_KEY
    },
})

