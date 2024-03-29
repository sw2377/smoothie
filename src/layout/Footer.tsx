import SmoothieLgooSVG from "../assets/logo.svg?react";

function Footer() {
  return (
    <footer className="flex justify-center items-center w-full h-56 bg-primary">
      <div>
        <SmoothieLgooSVG width="128" height="128" />
      </div>
      <div className="ml-4 text-sm text-white">
        <p>Copyright 블루베리스무디. All rights reserved</p>
        <a
          href="https://github.com/codestates-seb/seb45_main_024"
          target="_blank"
        >
          [Footer는 수정예정] <br /> GitHub Repository 바로가기
        </a>
      </div>
    </footer>
  );
}

export default Footer;
