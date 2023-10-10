import Link from "next/link";
import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import CreateNoteDialog from "@/components/CreateNoteDialog";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

const Dashboard = async () => {
  const { userId } = auth();
  const notes = await db
    .select()
    .from($notes)
    .where(eq($notes.userId, userId!));

  return (
    <div className="bg-gradient-to-r min-h-screen from-blue-200 to-indigo-300">
      <div className="max-w-7xl mx-auto p-10">
        <div className="h-14"></div>
        <div className="flex justify-center items-center md:flex-row flex-col">
          <div className="flex items-center">
            <Link href={"/"}>
              <Button className="bg-blue-800" size={"sm"}>
                <ArrowLeft className="mr-1 w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="w-4"></div>
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <div className="w-4"></div>
            <UserButton />
          </div>
        </div>

        <div className="h-8"></div>
        <Separator />
        <div className="h-8"></div>

        {/* if no notes available */}
        {notes.length === 0 && (
          <div className="text-center">
            <h2 className="text-xl text-gray-500">You have no notes yet</h2>
          </div>
        )}

        {/* display all notes */}

        <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-4">
          <CreateNoteDialog />

          {notes.map((note) => (
            <a href={`/notebook/${note.id}`} key={note.id}>
              <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                <Image
                  src={note.imageUrl || ""}
                  alt={note.name}
                  width={400}
                  height={200}
                />
                <div className="p-4"></div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {note.name}
                </h3>
                <div className="h-1"></div>
                <p className="text-sm text-gray-500">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
