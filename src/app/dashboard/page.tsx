import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import CreateNoteDialog from "@/components/CreateNoteDialog";

const Dashboard = () => {
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

        {/* list of all notes */}

        <div className="text-center">
          <h2 className="text-xl text-gray-500">You have no notes yet</h2>
        </div>

        {/* display of the notes */}

        <div className="grid sm:grid-cols-3 md:grid-cols-5">
          <CreateNoteDialog />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
