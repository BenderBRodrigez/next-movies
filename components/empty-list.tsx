"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

export const EmptyList = () => {
  const router = useRouter();

  const addMovie = () => {
    router.push("/movie/add");
  };

  return (
    <div className={"flex flex-col gap-10 items-center"}>
      <h2 className="text-center">Your movie list is empty</h2>
      <Button className="w-full sm:w-auto" onClick={addMovie}>
        Add a new movie
      </Button>
    </div>
  );
};
