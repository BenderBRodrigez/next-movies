"use client";

import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { QueryContext } from "../../../components/query/query.context";
import { MovieForm } from "../../../components/movie-form";
import { useRouter } from "next/navigation";

export default function AddMovie() {
  const router = useRouter();
  const { mutationFn, onError } = useContext(QueryContext);
  const { mutate } = useMutation({
    mutationFn,
    onError,
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = useCallback(
    (movieData: FormData) => {
      if (!movieData.get("file")) {
        toast.error("Image is required");
        return;
      }
      mutate({ path: "movie", method: "POST", body: movieData });
    },
    [mutate]
  );

  return (
    <>
      <h2>Create a new movie</h2>
      <MovieForm submitForm={onSubmit} />
    </>
  );
}
