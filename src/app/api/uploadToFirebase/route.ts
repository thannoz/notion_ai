import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { uploadFileToFirebase } from "@/lib/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { noteId } = await req.json();
    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.id, parseInt(noteId)));

    if (!notes[0].imageUrl) {
      return new NextResponse("no image url found", { status: 404 });
    }
    const firebase_url = await uploadFileToFirebase(
      notes[0].imageUrl,
      notes[0].name
    );

    // updating the image url in database with firebase image url
    await db
      .update($notes)
      .set({ imageUrl: firebase_url })
      .where(eq($notes.id, parseInt(noteId)));
    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    return new NextResponse("error", { status: 500 });
  }
};
