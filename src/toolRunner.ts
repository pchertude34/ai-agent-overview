import type OpenAI from "openai";
import { weatherTool, weatherToolDefinition } from "./tools/weather";

export const runTool = async (toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall, userMessage: string) => {
  const input = { userMessage, toolArgs: JSON.parse(toolCall?.function?.arguments || "{}") };

  switch (toolCall.function.name) {
    case weatherToolDefinition.name:
      return weatherTool(input);
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`);
  }
};
