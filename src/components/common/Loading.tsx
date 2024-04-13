import LoadingSVG from "../../assets/logo-loading.svg?react";

function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="absolute w-full h-full bg-black/70"></div>
      <div className="z-50">
        <LoadingSVG className="animate-bounce" />
      </div>
    </div>
  );
}

export default Loading;
