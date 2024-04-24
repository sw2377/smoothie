import { Sticker } from "lucide-react";

function NoContent() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-[200px]">
      <Sticker />
      <p>아직 작성하신 내용이 없어요!</p>
    </div>
  );
}

export default NoContent;
