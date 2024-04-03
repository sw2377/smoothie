import { useEffect, useState } from "react";
import zeplin from "../assets/icons/zeplin.svg";

interface GetLogoProps {
  logoTitle: string;
}

function GetTechLogo({ logoTitle }: GetLogoProps) {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  let logoName = logoTitle.toLowerCase();

  // 예외
  switch (logoName) {
    case "vue":
      logoName = "vuejs";
      break;
    case "aws":
      logoName = "amazonwebservices";
      break;
    case "reactnative":
      logoName = "react";
      break;
    case "angular":
      logoName = "angularjs";
      break;
    case "toolkit":
      logoName = "redux";
      break;
    case "tailwind":
      logoName = "tailwindcss";
      break;
    case "c#":
      logoName = "csharp";
      break;
    case "c++":
      logoName = "cplusplus";
      break;
    default:
      break;
  }

  useEffect(() => {
    if (logoName === "zeplin") {
      setLogoSrc(zeplin);
      return;
    }

    const originalURL = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoName}/${logoName}-original.svg`;
    const plainURL = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoName}/${logoName}-plain.svg`;

    fetch(originalURL)
      .then(res => {
        if (res.status === 200) {
          setLogoSrc(originalURL);
        } else {
          setLogoSrc(plainURL);
        }
      })
      .catch(err => {
        console.info("Error fetching the logo:", err);
        // setLogoSrc(plainURL); // ??
      });
  }, [logoName]);

  return <>{logoSrc && <img src={logoSrc} alt={`${logoTitle} logo`} />}</>;
}

export default GetTechLogo;
