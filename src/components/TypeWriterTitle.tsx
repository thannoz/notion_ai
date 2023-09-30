"use client";
import Typewriter from "typewriter-effect";

const TypeWriterTitle = () => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("🚀 Supercharged Productivity.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🤖 AI-Powered Insights.")
          .start();
      }}
    />
  );
};

export default TypeWriterTitle;
