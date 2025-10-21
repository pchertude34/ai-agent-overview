import type { AIMessage } from "../types";
import { zodFunction } from "openai/helpers/zod.mjs";
import { openai } from "./ai.ts";
import { systemPrompt } from "./systemPrompt.ts";

export const runLLM = async ({ messages, tools }: { messages: AIMessage[]; tools: any[] }) => {
  const formattedTools = tools.map(zodFunction);
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    // "Randomness" of the agent's reasoning - Higher temp, more creative / random
    temperature: 0.1,
    // Start the conversation with the system prompt
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    // tools: formattedTools,
    tools: [],
    tool_choice: "auto",
    parallel_tool_calls: false,
  });

  return response.choices[0].message;
};
