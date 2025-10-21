import { runLLM } from "./llm";
import { logMessage, showLoader } from "./ui";
import { addMessages, getMessages } from "./memory";

export const runAgent = async ({ userMessage, tools }: { userMessage: string; tools: any[] }) => {
  await addMessages([{ role: "user", content: userMessage }]);

  const loader = showLoader("Thinking...");

  while (true) {
    // Get the conversation up to this point. Agent conversations always need the entier context.
    const history = await getMessages();
    const response = await runLLM({ messages: history, tools: [] });

    await addMessages([response]);

    if (response.content) {
      loader.stop();
      logMessage(response);
      return getMessages();
    }
  }
};
