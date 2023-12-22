import { NextRequest, NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";
export async function POST(request: NextRequest) {
  const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLY_API!,
  });
  try {
    const reqBody = await request.json();
    const { filepath } = reqBody;
    const FILE_URL = filepath;
    let wholeText: string;
    // Request parameters where speaker_labels has been enabled

    return NextResponse.json({ wholeText }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET() {
  return NextResponse.json({ "Name:": "bolo SM" });
}
