import type { ToolFn } from "../../types";
import { z } from "zod";
import fetch from "node-fetch";

const apiKey = process.env.WEATHER_API_KEY;

export const weatherToolDefinition = {
  name: "get_current_weather",
  description: "Get the current weather for a given location",
  parameters: z
    .object({
      lat: z.string().describe("The latitude of the location"),
      lon: z.string().describe("The longitude of the location"),
    })
    .required({ lon: true, lat: true }),
};

type Args = z.infer<typeof weatherToolDefinition.parameters>;

export const weatherTool: ToolFn<Args, string> = async ({ toolArgs }) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${toolArgs.lat}&lon=${toolArgs.lon}&appid=${apiKey}`
  );

  if (!response.ok) {
    return `Failed to fetch weather data for ${toolArgs.lat}.`;
  }

  const data = await response.json();

  return JSON.stringify({
    data,
  });
};
