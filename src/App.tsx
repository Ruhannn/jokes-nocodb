import { AnimatePresence, motion } from "framer-motion";
import Error from "./Components/Error";
import Loading from "./Components/Loading";
import { useJokes } from "./service";
import { Joke } from "./types";
import { useRef, useState } from "react";
import { formatDateTime } from "./lib/utils";
import { CgClose } from "react-icons/cg";
import { useClickAway } from "react-use";
import NavBar from "./Components/NavBar";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  console.log(selectedId);
  const { data, error, isLoading } = useJokes();

  const modalRef = useRef<HTMLDivElement>(null);
  useClickAway(modalRef, () => setSelectedId(null));
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error err={error.message} />;
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

            <p>{joke.title}</p>
          </motion.div>
        ))}
        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 overflow-hidden bg-black/50 backdrop-blur-sm "
            >
              <motion.div
                layoutId={selectedId.toString()}
                className="fixed flex items-center justify-center inset-[120px] p-4 rounded-md shadow-md cursor-pointer bg-neutral-800 flex-col"
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
                <p>
                  {data.find((joke: Joke) => joke.Id === selectedId)?.title}
                </p>
                <p className="text-xl">
                  {formatDateTime(
                    data.find((joke: Joke) => joke.Id === selectedId).CreatedAt
                  )}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
