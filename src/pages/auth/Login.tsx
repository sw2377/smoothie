import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginDataType } from "../../model/auth.types";
import Button from "../../components/UI/button/ActionButton";
import SocialLoginButton from "../../components/UI/button/SocialLoginButton";
import GoogleLogoSVG from "../../assets/icons/google.svg?react";
import GithubLogoSVG from "../../assets/icons/github.svg?react";

import { supabase } from "../../app/supabase";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>();
  const onSubmit: SubmitHandler<LoginDataType> = data => console.log(data);

  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    console.log(data, error);
  };

  return (
    <main>
      <div className="flex flex-col gap-5 w-full max-w-96">
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
          <Link
            to="/findpassword"
            className="text-xs font-bold text-primary self-end"
          >
            Forgot Password
          </Link>
          <Button buttonType="submit" handleClick={handleSubmit(onSubmit)}>
            Log in
          </Button>
        </form>
        {/* Social Login */}
        <div className="flex flex-col gap-2">
          <SocialLoginButton
            socialLogo={GoogleLogoSVG}
            text="Log in with Google"
            handleClick={() => {}}
          />
          <SocialLoginButton
            socialLogo={GithubLogoSVG}
            text="Log in with Github"
            handleClick={signInWithGithub}
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
