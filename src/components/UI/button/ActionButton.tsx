import { ReactNode } from "react";

interface ActionButtonProps {
  type?: "normal" | "outline";
  buttonType?: "button" | "submit";
  handleClick: () => void;
  children: ReactNode;
}

function ActionButton({
  type = "normal",
  buttonType = "button",
  handleClick,
  children,
}: ActionButtonProps) {
  return (
    <button
      className={`border-primary ${type === "normal" ? "bg-primary text-white hover:bg-[#0E2F2B]" : "text-primary hover:bg-primary hover:text-white"}`}
      onClick={handleClick}
      type={buttonType}
    >
      {children}
    </button>
  );
}

export default ActionButton;
