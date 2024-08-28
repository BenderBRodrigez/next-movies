"use client";

import { useQuery } from "@tanstack/react-query";
import { Movie } from "../../entities/movie.entity";
import { PagingResult } from "../../types/paging-result";
import { useContext } from "react";
import { AuthContext } from "../../components/auth/auth.context";
import { EmptyList } from "../../components/empty-list";
import { MovieList } from "../../components/movie-list";
import { PAGE_LIMIT } from "../../constants/page-limit.constant";

type PageProps = {
  params: { page: string };
};

export default function Page({ params }: PageProps) {
  const { token } = useContext(AuthContext);
  const { data, isLoading } = useQuery<PagingResult<Movie>>({
    queryKey: ["movie", { page: params.page, limit: PAGE_LIMIT }],
    enabled: !!token,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20 sm:px-24 sm:py-24">
      {isLoading ? (
        <p>Loading...</p>
      ) : data?.results.length ? (
        <MovieList data={data} page={params.page} />
      ) : (
        <EmptyList />
      )}
    </main>
  );
}
