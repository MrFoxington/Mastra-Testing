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

import { Mastra } from '@mastra/core';
import { createLogger } from '@mastra/core';
import { weatherAgent } from './agents';

// export const mastra = new Mastra({
//   agents: { weatherAgent },
//   logger: createLogger({
//     name: 'Mastra',
//     level: 'info',
//   }),
// });

const mastra = new Mastra();
const llm = mastra.LLM({
  provider: "ANTHROPIC",
  name: "claude-3-5-sonnet-20241022",
  apiKey: process.env.ANTHROPIC_API_KEY
})

const response = await llm.generate("Tell me about the moon landing")
console.log(response.text)

