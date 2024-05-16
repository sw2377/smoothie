import { useEffect, useState } from "react";
import zeplin from "../../assets/icons/zeplin.svg";

interface GetLogoProps {
  logoTitle: string;
  style?: string;
}

function GetTechLogo({ logoTitle, style }: GetLogoProps) {
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
      setLogoSrc(zeplin as string);
      return;
    }

    getTechLogo();
  }, [logoName]);

  const getTechLogo = () => {
    const originalURL = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoName}/${logoName}-original.svg`;
    const originalWordmarkURL = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${logoName}/${logoName}-original-wordmark.svg`;
    const plainURL = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logoName}/${logoName}-plain.svg`;

    fetch(originalURL)
      .then(res => {
        if (logoName === "amazonwebservices") {
          setLogoSrc(originalWordmarkURL);
          return;
        }

        if (res.status === 200) {
          setLogoSrc(originalURL);
        } else {
          setLogoSrc(plainURL);
        }
      })
      .catch(err => {
        console.warn("ERROR FETCHING THE LOGO", err);
      });
  };

  return (
    <>
      {logoSrc && (
        <img src={logoSrc} alt={`${logoTitle} logo`} className={style} />
      )}
    </>
  );
}

export default GetTechLogo;
