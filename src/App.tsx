import { AnimatePresence, motion } from "framer-motion";
import Loading from "./Components/Loading";
import { useJokes } from "./service";
import { Joke } from "./types";
import { useRef, useState } from "react";
import { formatDateTime } from "./lib/utils";
import { CgClose } from "react-icons/cg";
import { useClickAway } from "react-use";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // console.log(selectedId);
  const { data, isLoading } = useJokes();

  const modalRef = useRef<HTMLDivElement>(null);
  useClickAway(modalRef, () => setSelectedId(null));
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-neutral-900 min-h-screen text-[#e9e9e9] p-4">
      <NavBar />
      <div className="grid gap-4 place-items-center sm:grid-cols-2 lg:grid-cols-3">
        {data.map((joke: Joke) => (
          <motion.div
            layoutId={joke.Id?.toString()}
            onClick={() => setSelectedId(joke.Id ?? null)}
            key={joke.Id}
            className="flex flex-col items-center justify-center w-full h-56 p-4 rounded-md shadow-md cursor-pointer bg-neutral-800"
          >
            <q>{joke.joke}</q>

            <p>{joke.name}</p>
          </motion.div>
        ))}
        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{
                backdropFilter: "blur(0px)",
                backgroundColor: "rgb(0 0 0 / 0.0)",
              }}
              animate={{
                backdropFilter: "blur(4px)",
                backgroundColor: "rgb(0 0 0 / 0.5)",
              }}
              exit={{
                backdropFilter: "blur(0px)",
                backgroundColor: "rgb(0 0 0 / 0.0)",
              }}
              transition={{ duration: 0.1 }}
              className="fixed inset-0 overflow-hidden backdrop-blur-sm"
            >
              <motion.div
                // transition={{ type: "spring", stiffness: 350, damping: 25 }}
                layoutId={selectedId.toString()}
                className="fixed flex items-center justify-center lg:inset-[120px] inset-6 p-4 rounded-md shadow-md cursor-pointer bg-neutral-800 flex-col"
                ref={modalRef}
              >
                <button
                  className="absolute p-2 text-[#e9e9e9] bg-[#131313] rounded-full top-2 right-2"
                  onClick={() => setSelectedId(null)}
                >
                  <CgClose />
                </button>
                <q className="my-4 text-5xl">
                  {data.find((joke: Joke) => joke.Id === selectedId)?.joke}
                </q>
                <p className="text-lg">
                  {data.find((joke: Joke) => joke.Id === selectedId)?.name}
                </p>
                <motion.p
                  className="text-xl"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {formatDateTime(
                    data.find((joke: Joke) => joke.Id === selectedId).CreatedAt
                  )}
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default App;
