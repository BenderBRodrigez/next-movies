import Image from "next/image";
import { useRouter } from "next/navigation";
import { Movie } from "../entities/movie.entity";
import { useCallback } from "react";

type MovieCardProps = {
  data: Movie;
};

export const MovieCard = ({ data }: MovieCardProps) => {
  const router = useRouter();

  const editMovie = useCallback(() => {
    router.push(`/movie/${data.id}`);
  }, [data.id, router]);

  return (
    <div
      className="flex flex-col gap-2 bg-card sm:p-2 pb-3 sm:pb-4 rounded-xl cursor-pointer text-wrap max-w-[180px] sm:max-w-[282px]"
      onClick={editMovie}
    >
      <Image
        src={data.posterUrl}
        alt={data.title}
        width={266}
        height={400}
        className="object-cover h-[246px] sm:h-[400px] rounded-t-xl sm:rounded-xl"
      />
      <div className="flex flex-col gap-4 sm:gap-2 sm:mt-2 mx-3 sm:mx-2">
        <p className="text-xl">{data.title}</p>
        <p className="text-sm">{data.publishingYear}</p>
      </div>
    </div>
  );
};
