import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import TypeWriterTitle from "@/components/TypeWriterTitle";

export default function Home() {
  return (
    <div className="bg-gradient-to-r min-h-screen from-blue-200 to-purple-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center">
          AI<span className="text-blue-600 font-bold"> note taking</span>{" "}
          assistant.
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          <TypeWriterTitle />
        </h2>

        <div className="mt-8"></div>

        <div className="flex justify-center items-center">
          <Link href={"/dashboard"}>
            <Button className="bg-blue-800 ">
              Get Started{" "}
              <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
