import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { Joke } from "../types";

const getJokes = async () => {
  const { data } = await api.get("/records");
  return data.list;
};
const addJoke = async (joke: Joke) => {
  const response = await api.post("/records", joke);
  return response.data;
};
export const useJokes = () => {
  const qc = useQueryClient();
  // for get Jokes
  const { data, error, isLoading } = useQuery({
    queryKey: ["Jokes"],
    queryFn: getJokes,
    refetchInterval: 600000,
  });
// 
  const { mutate: addNewJoke } = useMutation({
    mutationFn: addJoke,
    onMutate: async (newJoke: Joke) => {
      await qc.cancelQueries({ queryKey: ["Jokes"] });
      const previousJokes = qc.getQueryData(["Jokes"]);
      qc.setQueryData(["Jokes"], (oldJokes: Joke[] | undefined) => [
        ...(oldJokes || []),
        newJoke,
      ]);
      return { previousJokes };
    },
    onError: (err, __, context) => {
      qc.setQueryData(["Jokes"], context?.previousJokes);
      //   toast.error(`${err.message} :C`);
    },
    onSuccess: () => {
      console.log("added");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["Jokes"] });
    },
  });
  return {
    data,
    error,
    isLoading,
    addNewJoke,
  };
};
