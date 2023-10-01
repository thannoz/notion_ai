"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CreateNoteDialog = () => {
  const [input, setInput] = useState<string>("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="border-dashed border-2 flex
         border-blue-600 h-full rounded-lg
        items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4"
        >
          <Plus className="w-6 h-6 text-blue-600" strokeWidth={3} />
          <h2 className="font-semibold text-blue-600 sm:mt-2">New Note Book</h2>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-gray-100">
        <DialogHeader>
          <DialogTitle>New Note Book</DialogTitle>
          <DialogDescription>
            You can create a new note by clicking the button below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={onChangeHandler}
            type="text"
            placeholder="Name..."
          />
          <div className="h-4"></div>
          <div className="flex items-center gap-3">
            <Button type="reset" variant={"outline"}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-500">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;
