import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({
  path: resolve(__dirname, '../.env.development')
});

import { CoreMessage, Mastra } from '@mastra/core';
import { createLogger } from '@mastra/core';
import { weatherAgent } from './agents';
import { z } from "zod";
import { chefAgent } from './agents/cheffAgent';

// export const mastra = new Mastra({
//   agents: { weatherAgent },
//   logger: createLogger({
//     name: 'Mastra',
//     level: 'info',
//   }),
// });

// // Basic Sample
// const mastra = new Mastra();
// const llm = mastra.LLM({
//   provider: "ANTHROPIC",
//   name: "claude-3-5-sonnet-20241022",
//   apiKey: process.env.ANTHROPIC_API_KEY
// })

// const response = await llm.generate("Tell me about the moon landing")
// console.log(response.text)


// // System Prompted Message Sample
// const mastra = new Mastra();
// const llm = mastra.LLM({
//   provider: "ANTHROPIC",
//   name: "claude-3-5-sonnet-20241022",
//   apiKey: process.env.ANTHROPIC_API_KEY
// })

// const message = [{
//   role: "system",
//   content: "You are Niel Armstrong"
// },
// {
//   role: "user",
//   content: "Tell me about the moon landing"
// }] as CoreMessage[];

// const response = await llm.generate(message)
// console.log(response.text)


// // System Prompted Message - Streamed - Sample
// const mastra = new Mastra();
// const llm = mastra.LLM({
//   provider: "ANTHROPIC",
//   name: "claude-3-5-sonnet-20241022",
//   apiKey: process.env.ANTHROPIC_API_KEY
// })

// const message = [{
//   role: "system",
//   content: "You are Niel Armstrong"
// },
// {
//   role: "user",
//   content: "Retell the famouse moment of your moonlanding"
// }] as CoreMessage[];

// const stream = await llm.stream(message)

// console.log('STARTING STREAM READ \n')
// for await (const chunk of stream.textStream) {
//   process.stdout.write(chunk)
// }
// console.log('\n')


// // Response Schema - Sample (not Perfect)
// const mastra = new Mastra();
// const llm = mastra.LLM({
//   provider: "ANTHROPIC",
//   name: "claude-3-5-sonnet-20241022",
//   apiKey: process.env.ANTHROPIC_API_KEY
// })

// const responseSchema = z.object({
//   definition: z.string(),
//   example: z.string()
// })

// const message = [{
//   role: "system",
//   content: "You are Niel Armstrong, give yous insight with one example at a time"
// },
// {
//   role: "user",
//   content: "Define some terms used during the Moon Landing and examples how to use them."
// }] as CoreMessage[];

// const response = await llm.generate(message, { output: responseSchema })
// console.log(response)



// const mastra = new Mastra({
//   agents: { chefAgent },
// })

// const query = "I have milk, cereal, cream, flour garlic, bytter, cheese, bread and salami. What can I make?"

// // console.log("\n User:", query);
// // const response = await chefAgent.generate([{ role: "user", content: query }]);
// // console.log("\n👨‍🍳 Chef:", response.text);

// console.log("\n User:", query);
// const stream = await chefAgent.stream([{ role: "user", content: query }]);

// console.log('STARTING STREAM READ \n')
// for await (const chunk of stream.textStream) {
//   process.stdout.write(chunk)
// }
// console.log("\n👨‍🍳 Chef - Recipie Complete");



const mastra = new Mastra({
  agents: { chefAgent },
})

const query = "I have milk, cereal, cream, flour garlic, bytter, cheese, bread and salami. What can I make?"
const schema = z.object({
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string()
    }),
  ),
  steps: z.array(z.string()),
})
console.log("\n User:", query);
const response = await chefAgent.generate([{ role: "user", content: query }], { output: schema });
console.log("\n👨‍🍳 Chef:", response.object);


// console.log("\n User:", query);
// const stream = await chefAgent.stream([{ role: "user", content: query }]);

// console.log('STARTING STREAM READ \n')
// for await (const chunk of stream.textStream) {
//   process.stdout.write(chunk)
// }
// console.log("\n👨‍🍳 Chef - Recipie Complete");

