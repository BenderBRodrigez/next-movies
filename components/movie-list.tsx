import { useRouter } from "next/navigation";
import { Movie } from "../entities/movie.entity";
import { PagingResult } from "../types/paging-result";
import { MdAddCircleOutline, MdLogout } from "react-icons/md";
import { useContext, useCallback } from "react";
import { AuthContext } from "./auth/auth.context";
import { MovieCard } from "./movie-card";
import { PAGE_LIMIT } from "../constants/page-limit.constant";
import Link from "next/link";
import { cn } from "../utils/common-utils";

type MovieListProps = {
  data: PagingResult<Movie>;
  page: string;
};

export const MovieList = ({ data, page }: MovieListProps) => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const currentPage = parseInt(page);
  const pages = Math.ceil(data.total / PAGE_LIMIT);

  const addMovie = useCallback(() => {
    router.push("/movie/add");
  }, [router]);

  const onPrev = useCallback(() => {
    if (currentPage > 1) {
      router.push(`/${currentPage - 1}`);
    }
  }, [router, currentPage]);

  const onNext = useCallback(() => {
    if (currentPage < pages) {
      router.push(`/${currentPage + 1}`);
    }
  }, [router, currentPage, pages]);

  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <section className="flex justify-between items-end">
        <div className="flex gap-3 items-end">
          <h2>My movies</h2>
          <MdAddCircleOutline
            className="size-6 sm:size-8 m-1 cursor-pointer"
            onClick={addMovie}
          />
        </div>
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={logout}
        >
          <span className="hidden sm:block">Logout</span>
          <MdLogout className="size-6 sm:size-8 m-1" />
        </div>
      </section>
      <section className="flex flex-wrap gap-5 sm:gap-6 my-16 sm:my-20 justify-center">
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </section>
      <section className="flex justify-center gap-2 mb-32">
        <div
          className={cn(
            "text-center leading-8 px-2",
            currentPage !== 1 && "cursor-pointer"
          )}
          onClick={onPrev}
        >
          Prev
        </div>
        {Array.from({ length: pages }).map((_, index) => (
          <Link
            key={index}
            href={`/${index + 1}`}
            className={cn(
              "size-8 rounded bg-card text-center leading-8",
              currentPage === index + 1 && "bg-primary"
            )}
          >
            {index + 1}
          </Link>
        ))}
        <div
          className={cn(
            "text-center leading-8 px-2",
            currentPage !== pages && "cursor-pointer"
          )}
          onClick={onNext}
        >
          Next
        </div>
      </section>
    </div>
  );
};
