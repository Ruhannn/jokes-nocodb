import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AddJoke, BottomGradient } from "./AddJoke";
import { useJokes } from "../service";
import { toast } from "sonner";

const NavBar = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideNav, setHideNav] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { addNewJoke } = useJokes();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
    setLastScrollY(currentScrollY);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const joke = formData.get("joke") as string;
    if (!name) {
      toast.info("we want to know your name ;3");
      return;
    }

    if (!joke) {
      toast.info("don't u gonna tell us ;C");
      return;
    }
    addNewJoke({ name: name, joke: joke });
    toast.success("may this is the reason of someone's smile ty ;3");
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: hideNav ? "-100%" : "0%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 z-50 w-full shadow-lg bg-neutral-950"
      >
        <nav className="container flex items-center justify-between p-4 mx-auto text-white">
          <h1>Noco Jokes</h1>
          <button
            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-[150px] text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={() => setIsModalOpen(true)}
          >
            Submit Joke &rarr;
            <BottomGradient />
          </button>
        </nav>
      </motion.div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="p-4 bg-neutral-950 rounded-lg w-[450px]"
          >
            <AddJoke handleSubmit={handleSubmit} />
          </div>
        </div>
      )}
      <div className="mt-16" />
    </>
  );
};

export default NavBar;
