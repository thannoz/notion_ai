import { db } from "@/lib/db";
import { generateImage, generateImagePrompt } from "@/lib/db/openai";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

/*
1. we get the image description from the model
2. we generate the image based on the image description
*/
export const POST = async (req: Request) => {
  const { userId } = auth();

  if (!userId) return new NextResponse("unauthorized", { status: 401 });

  const body = await req.json();
  const { name } = body;
  const img_description = await generateImagePrompt(name);

  if (!img_description)
    return new NextResponse("failed to generate image description", {
      status: 500,
    });

  const img_url = await generateImage(img_description);
  if (!img_url)
    return new NextResponse("failed to generate image", {
      status: 500,
    });

  const note_ids = await db
    .insert($notes)
    .values({
      name,
      userId,
      imageUrl: img_url,
    })
    .returning({ insertedID: $notes.id });

  return NextResponse.json({ note_id: note_ids[0].insertedID });
};
