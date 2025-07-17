const FIREWORKS_API_KEY = import.meta.env.VITE_FIREWORKS_API_KEY;

export async function getBotResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${FIREWORKS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "accounts/fireworks/models/kimi-k2-instruct",
        messages: [
          { role: "system", content: "You are a helpful AI assistant that helps people with posture correction and product selection." },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    console.log("Fireworks API response:", data); // For debugging

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else if (data.error) {
      return `API Error: ${data.error.message || JSON.stringify(data.error)}`;
    } else {
      return "I'm sorry, I couldn't generate a response. Please try again.";
    }
  } catch (error) {
    console.error("Fireworks API error:", error);
    return "Oops! Something went wrong connecting to AI.";
  }
} 