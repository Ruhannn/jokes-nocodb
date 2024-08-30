import React from "react";
import { Input, Label } from "./Form";
import { cn } from "../lib/utils";
import { useJokes } from "../service";

export function AddJoke() {
  const { addNewJoke } = useJokes();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const joke = formData.get("joke") as string;
    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (!joke) {
      alert("Please enter a joke.");
      return;
    }
    addNewJoke({ title: name, joke: joke });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-xl  text-neutral-200">Noco Jokes</h2>
      <p className=" text-sm max-w-sm mt-2 text-neutral-300">
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

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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
