import { BsGithub, BsTwitter } from "react-icons/bs";

export default function Footer() {
  return (
    <section className="mt-8 rounded-md bg-neutral-950">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <p className="text-base leading-6 text-center text-gray-400 ">
          Made by Ruhan
        </p>
        <div className="flex justify-center mt-8 space-x-6">
          <a href="https://github.com/ruhannn" target="_blank">
            <BsGithub className="text-2xl text-gray-400 hover:text-[#e9e9e9]" />
          </a>
          <a href="https://x.com/ruhan_17" target="_blank">
            <BsTwitter className="text-2xl text-gray-400 hover:text-[#e9e9e9]" />
          </a>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © 2029 me, Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
}
