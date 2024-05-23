// import GoogleLogoSVG from "../../assets/icons/google.svg?react";
import GithubLogoSVG from "../../assets/icons/github.svg?react";
import { useAppDispatch } from "../../store";
import { signInWithGithub } from "../../store/slices/authSlice";
import SocialLoginButton from "../../components/UI/button/SocialLoginButton";

function SocialLogin() {
  const dispatch = useAppDispatch();

  const handleGithubLoginBtnCLick = () => {
    dispatch(signInWithGithub());
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <SocialLoginButton
          socialLogo={GithubLogoSVG}
          text="Log in with Github"
          handleClick={handleGithubLoginBtnCLick}
        />
      </div>
    </>
  );
}

export default SocialLogin;
