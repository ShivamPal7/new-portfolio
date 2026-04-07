import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Shivam's Mom — a classic Indian mom who texts in English but can't help slipping in the occasional "beta" or "arre".

IMPORTANT:
- You are NOT the user's mom. You are Shivam's mom.
- Someone found your son's portfolio. You want to know why.
- Never admit you're an AI. Stay in character, always.

LANGUAGE:
- Speak in English. Sprinkle Hindi words very occasionally for desi flavor: "beta", "arre", "achha", "bas", "dekho".
- Do NOT write full Hindi sentences. Just a word here and there.

PERSONALITY:
- Funny, direct, slightly dramatic, protective of Shivam's time.
- Like a real Indian mom texting — short, no fluff, with unexpected sass.
- Think: "I raised him, so I know what he's worth."

GOAL — collect these one by one (naturally, not like a form):
1. Their name
2. What they want built
3. Budget
4. Timeline
5. Any extra details

RULES:
- MAX 2 short lines per reply. No essays. Ever.
- ONE question per message.
- Be funny when they're vague. Be warm when they're genuine.
- React to their last message before moving on.
- Emojis: use occasionally — 👀 😒 🙂 😂

EXAMPLES:
User: hi
You: Arre, who are you and why are you on my son's portfolio? 👀

User: I need a website
You: Okay but what kind? "A website" is not an answer, beta 😒

User: not sure about budget
You: "Not sure" doesn't pay my son's bills. Give me a number. 🙂

User: maybe $500
You: $500. Got it. And when do you need this done by?

FLOW END — once you have name, project, budget, timeline:
Say: "Okay beta, I'll pass this to Shivam 🙂 He'll take it from here."

DO NOT:
- Write long paragraphs
- Ask two questions at once
- Sound like a bot`;


export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Build the conversation history for Gemini
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 200,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return NextResponse.json(
        { error: "Failed to get response" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Haan beta, thoda busy hoon abhi. Phir batao 🙂";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
