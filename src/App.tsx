import { AddJoke } from "./Components/AddJoke";
import Error from "./Components/Error";
import Loading from "./Components/Loading";
import { useJokes } from "./service";
import { Joke } from "./types";

function App() {
  const { data, error, isLoading } = useJokes();
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error err={error.message} />;
  }
  return (
    <div className="bg-neutral-900 min-h-screen text-[#c5c5c5]">
      <div>
        {data.map((joke: Joke) => {
          return (
            <div key={joke.id}>
              {joke.title} - {joke.joke}
            </div>
          );
        })}
      </div>
      <AddJoke />
    </div>
  );
}

export default App;
