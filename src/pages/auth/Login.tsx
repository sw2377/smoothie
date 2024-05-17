import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../store";
import {
  signInWithEmail,
  signInWithGithub,
} from "../../store/slices/authSlice";
import { LoginDataType } from "../../model/auth.types";
import ActionButton from "../../components/UI/button/ActionButton";
import SocialLoginButton from "../../components/UI/button/SocialLoginButton";
import LogoKorean_SVG from "../../assets/logo-korean.svg?react";
// import LogoSVG from "../../assets/logo.svg?react";
// import GoogleLogoSVG from "../../assets/icons/google.svg?react";
import GithubLogoSVG from "../../assets/icons/github.svg?react";

// import Loading from "../../components/common/Loading";

function Login() {
  // const { isLoading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>();

  const onSubmit: SubmitHandler<LoginDataType> = data => {
    const reqData = {
      email: data.email,
      password: data.password,
    };
    dispatch(signInWithEmail(reqData))
      .unwrap()
      .then(() => {
        console.log("🚀 SIGN IN WITH EMAIL");
        navigate("/");
        window.location.reload(); // 임시
      })
      .catch(error => {
        console.warn("❌ ERROR : SIGN IN WITH EMAIL", error);
        alert(error);
      });
  };

  const handleGithubLoginBtnCLick = () => {
    dispatch(signInWithGithub());
  };

  return (
    <main>
      <div className="flex flex-col gap-5 w-full max-w-96">
        <div className="flex justify-center w-full mb-4">
          {/* <LogoSVG width={120} height={120} /> */}
          <LogoKorean_SVG />
        </div>
        {/* <div className="mb-4">
          <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray_3">
            Welcome back! Please enter your details
          </p>
        </div> */}
        {/* Basic Login */}
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <label className="font-bold">Email</label>
            <input
              {...register("email", {
                required: "이메일을 입력해 주세요.",
                pattern: {
                  value:
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, // "아이디@도메인" 형식 확인
                  message: "이메일 형식이 맞지 않습니다.",
                },
              })}
              type="text"
              placeholder="Enter your eamil"
            />
            {errors.email && (
              <span className="text-xs text-error">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Password</label>
            <input
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
              })}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-xs text-error">
                {errors.password.message}
              </span>
            )}
          </div>
          {/* <Link
            to="/findpassword"
            className="text-xs font-bold text-primary self-end"
          >
            Forgot Password
          </Link> */}
          <ActionButton
            buttonType="submit"
            style="py-3"
            handleClick={handleSubmit(onSubmit)}
          >
            Log in
          </ActionButton>
        </form>
        {/* Social Login */}
        <div className="flex flex-col gap-2">
          {/* <SocialLoginButton
            socialLogo={GoogleLogoSVG}
            text="Log in with Google"
            handleClick={() => {}}
          /> */}
          <SocialLoginButton
            socialLogo={GithubLogoSVG}
            text="Log in with Github"
            handleClick={handleGithubLoginBtnCLick}
          />
        </div>
        <p className="text-gray_2 text-xs text-center mt-5">
          Dont' have an account?{" "}
          <Link to="/signup" className="text-primary font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
