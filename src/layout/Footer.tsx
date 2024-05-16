import SmoothieLgooSVG from "../assets/logo.svg?react";

function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-48 bg-primary">
      <div className="flex items-center max-w-[1200px] px-6">
        <div>
          <SmoothieLgooSVG width="80" height="80" />
        </div>
        <div className="ml-4 text-xs text-white">
          <a
            href="https://github.com/codestates-seb/seb45_main_024"
            target="_blank"
            className="hover:font-bold"
          >
            GitHub Repository 바로가기
          </a>
          <p className="mt-1">Copyright 블루베리스무디. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
