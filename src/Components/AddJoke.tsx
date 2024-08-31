/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input, Label } from "./Form";
import { cn } from "../lib/utils";

export function AddJoke({ handleSubmit }: any) {



  return (
    <div
      className="w-full max-w-md p-4 mx-auto bg-black rounded-none md:rounded-2xl md:p-8 shadow-input"
    >
      <h2 className="text-xl font-bold text-neutral-200">Noco Jokes</h2>
      <p className="max-w-sm mt-2 text-sm text-neutral-300">
        submit your cutest Joke
      </p>

      <form className="my-8" onSubmit={handleSubmit} autoComplete="off">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input name="name" placeholder="your name" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="joke">Joke</Label>
          <Input name="joke" placeholder="tell me :D" type="text" />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit Joke &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 block w-full h-px transition duration-500 opacity-0 group-hover/btn:opacity-100 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="absolute block w-1/2 h-px mx-auto transition duration-500 opacity-0 group-hover/btn:opacity-100 blur-sm -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
