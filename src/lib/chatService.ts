const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function getBotResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        // Optionally add conversation_id and user_context if you want session support
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      return data.response;
    } else if (data.error) {
      return `API Error: ${data.error}`;
    } else {
      return "I'm sorry, I couldn't generate a response. Please try again.";
    }
  } catch (error) {
    console.error("Backend API error:", error);
    return "Oops! Something went wrong connecting to AI.";
  }
} 