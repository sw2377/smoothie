import { X } from "lucide-react";

interface TextTagProps {
  text: string;
  onDelete(text: string): void;
}

function TextTag({ text, onDelete }: TextTagProps) {
  return (
    <li className="flex items-center bg-secondary px-4 py-2 rounded-3xl text-sm font-medium">
      <span>{text}</span>
      <X
        width="20"
        height="20"
        className="cursor-pointer ml-2"
        color="#4F4F4F"
        onClick={() => {
          onDelete(text);
        }}
      />
    </li>
  );
}

export default TextTag;
