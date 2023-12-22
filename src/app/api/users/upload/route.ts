import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";
import { OpenAI } from "openai";
import path from "path";
import axios from "axios";
export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const name = data.get("name");
  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const pathe: string = `./${file.name}`;
  await writeFile(pathe, buffer);
  const filepath: string = path.join(__dirname, file.name);

  //
  // try {
  //   const response = await axios.post("/api/application/transcribe", filepath);
  //   console.log("sucess");
  //   console.log(response.data);
  // } catch (error: any) {
  //   console.log(error);
  //   console.log("Error");
  // }

  const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLY_API!,
  });
  const FILE_URL = `./${file.name}`;
  let wholeText: string;
  // Request parameters where speaker_labels has been enabled
  const Data = {
    audio_url: FILE_URL,
    speaker_labels: true,
  };
  const run = async () => {
    console.log("Transcription:");
    const transcript: any = await client.transcripts.create(Data);
    console.log(transcript.text);
    let utterancesArray = [];
    for (let utterance of transcript.utterances) {
      // console.log(`Speaker ${utterance.speaker}: ${utterance.text}`);
      utterancesArray.push(`Speaker ${utterance.speaker}: ${utterance.text}`);
    }
    wholeText = utterancesArray.join("\n");
  };

  const gpt = async () => {
    console.log("Transcription:");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API!,
    });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content: `${wholeText}\n
          Generate a concise summary of the meeting, highlighting key proposals, discussions, and updates. Focus on capturing the main points raised by each speaker and any decisions or actions taken during the meeting. Pay attention to metrics, improvements, and issue resolutions mentioned by the team.`,
        },
      ],
    });
    console.log(chatCompletion.choices[0]);
    return chatCompletion;
  };
  const sum = async () => {
    await run();
    return await gpt();
  };
  const summary = (await sum()).choices[0];

  return NextResponse.json({ success: true, summary });
}
