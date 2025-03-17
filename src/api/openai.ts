import axios from "axios";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const apiUrl = "https://api.openai.com/v1/chat/completions";

export async function translateText(text: string, targetLanguage: string) {
  try {
    const response = await axios.post(
      apiUrl,
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: `You are a translation assistant.` },
          {
            role: "user",
            content: `Translate the following to ${targetLanguage}: ${text}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Translation Error:", error);
    return "Translation failed.";
  }
}
