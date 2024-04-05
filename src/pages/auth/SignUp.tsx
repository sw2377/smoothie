import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupDataType } from "../../model/auth.types";
import ActionButton from "../../components/UI/button/ActionButton";
import SocialLoginButton from "../../components/UI/button/SocialLoginButton";
import GoogleLogoSVG from "../../assets/icons/google.svg?react";
import GithubLogoSVG from "../../assets/icons/github.svg?react";

import { supabase } from "../../app/supabase";

function Signup() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupDataType>();
  const onSubmit: SubmitHandler<SignupDataType> = data => {
    console.log(data);
    signUpNewUser(data.email, data.password);
  };

  async function signUpNewUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://example.com/welcome",
      },
    });

    console.log(data, error);
  }

  return (
    <main>
      <div className="flex flex-col gap-5 w-full max-w-96">
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
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, // 하나 이상의 영문자와 하나 이상의 숫자를 포함하는 최소 8자 형식 확인
                  message: "하나 이상의 영문자와 숫자를 포함해 주세요.",
                },
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
          <div className="flex flex-col gap-2">
            <label className="font-bold">Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "비밀번호를 확인해 주세요.",
                validate: {
                  matchesPreviousPassword: value => {
                    const { password } = getValues();
                    return (
                      password === value || "비밀번호가 일치하지 않습니다."
                    );
                  },
                },
              })}
              type="password"
              placeholder="Enter your password"
            />
            {errors.confirmPassword && (
              <span className="text-xs text-error">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <ActionButton
            buttonType="submit"
            style="py-3"
            handleClick={handleSubmit(onSubmit)}
          >
            Sign up
          </ActionButton>
        </form>
        {/* Social Signup */}
        <div className="flex flex-col gap-2">
          <SocialLoginButton
            socialLogo={GoogleLogoSVG}
            text="Sign up with Google"
            handleClick={() => {}}
          />
          <SocialLoginButton
            socialLogo={GithubLogoSVG}
            text="Sign up with Github"
            handleClick={() => {}}
          />
        </div>
        <p className="text-gray_2 text-xs text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
