import { PropsWithChildren } from "react";

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <div className={"flex items-center justify-center h-screen mx-6"}>
      <div className={"flex flex-col w-full max-w-80"}>
        <h1 className={"text-center mb-12"}>Sign In</h1>
        {children}
      </div>
    </div>
  );
}
