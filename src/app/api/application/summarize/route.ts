import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export async function POST(request: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API!,
  });
  try {
    const reqBody = await request.json();
    const { transcript, filename } = reqBody;
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content: `${transcript}\n
          Generate a concise summary of the meeting, highlighting key proposals, discussions, and updates. Focus on capturing the main points raised by each speaker and any decisions or actions taken during the meeting. Pay attention to metrics, improvements, and issue resolutions mentioned by the team.  The summary format should be heading and its details`,
        },
      ],
    });
    const summary = chatCompletion.choices[0];
    return NextResponse.json({ summary }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
