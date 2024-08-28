"use client";

import { useCallback, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryContext } from "../../../components/query/query.context";
import { MovieForm } from "../../../components/movie-form";
import { Movie } from "../../../entities/movie.entity";
import { AuthContext } from "../../../components/auth/auth.context";
import { useRouter } from "next/navigation";

type EditMovieProps = {
  params: { id: string };
};

export default function EditMovie({ params }: EditMovieProps) {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const { mutationFn, onError } = useContext(QueryContext);
  const { mutate } = useMutation({
    mutationFn,
    onError,
    onSuccess: () => {
      router.push("/");
    },
  });
  const { data, isLoading } = useQuery<Movie>({
    queryKey: [`movie/${params.id}`],
    enabled: !!token,
  });

  const onSubmit = useCallback(
    (movieData: FormData) => {
      mutate({ path: `movie/${params.id}`, method: "PUT", body: movieData });
    },
    [mutate, params.id]
  );

  return isLoading ? (
    <p className="text-center">Loading...</p>
  ) : (
    <>
      <h2>Edit</h2>
      <MovieForm data={data} submitForm={onSubmit} />
    </>
  );
}
