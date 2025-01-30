import { Agent } from '@mastra/core';
import { weatherTool } from '../tools/weather-tool'

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      
`,
  model: {
    provider: 'ANTHROPIC',
    name: 'claude-3-5-sonnet-20241022',
    toolChoice: 'auto',
  },
});
