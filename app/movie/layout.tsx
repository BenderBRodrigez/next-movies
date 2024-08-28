import { PropsWithChildren } from "react";

export default function MovieLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-20 sm:gap-32 mt-20 mx-6 sm:m-32 mb-52">
      {children}
    </div>
  );
}
