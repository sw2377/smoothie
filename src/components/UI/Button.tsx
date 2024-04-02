import { ReactNode } from "react";

interface ButtonProps {
  type?: "normal" | "outline";
  buttonType?: "button" | "submit";
  handleClick: () => void;
  children: ReactNode;
}

function Button({
  type = "normal",
  buttonType = "button",
  handleClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`px-5 py-2 text-nowrap rounded-lg border border-primary ${type === "normal" ? "bg-primary text-white hover:bg-[#0E2F2B]" : "text-primary hover:bg-primary hover:text-white"}`}
      onClick={handleClick}
      type={buttonType}
    >
      {children}
    </button>
  );
}

export default Button;
