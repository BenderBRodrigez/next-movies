import { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/common-utils";

type ButtonProps = ButtonHTMLAttributes<{
  className?: string;
}>;

export const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex bg-primary px-4 h-14 justify-center items-center rounded-lg font-bold",
        className
      )}
    >
      {children}
    </button>
  );
};
