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


// System Prompted Message - Streamed - Sample
const mastra = new Mastra();
const llm = mastra.LLM({
  provider: "ANTHROPIC",
  name: "claude-3-5-sonnet-20241022",
  apiKey: process.env.ANTHROPIC_API_KEY
})

const message = [{
  role: "system",
  content: "You are Niel Armstrong"
},
{
  role: "user",
  content: "Retell the famouse moment of your moonlanding"
}] as CoreMessage[];

const stream = await llm.stream(message)

console.log('STARTING STREAM READ \n')
for await (const chunk of stream.textStream) {
  process.stdout.write(chunk)
}
console.log('\n')
