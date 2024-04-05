import React, { ReactNode, useState } from "react";

interface TextInputProps {
  placeholder: string;
  onSubmit: (keyword: string) => void;
  children: ReactNode;
}

function TextInput({ placeholder, onSubmit, children }: TextInputProps) {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 w-96 px-4 py-2 border-gray_4 border rounded-3xl"
    >
      {children}
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        className="px-0 py-0 border-none w-full"
      />
    </form>
  );
}

export default TextInput;
