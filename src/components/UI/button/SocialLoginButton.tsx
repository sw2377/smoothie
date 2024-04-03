interface SocialLoginButtonProps {
  socialLogo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
  handleClick: () => void;
}

function SocialLoginButton({
  socialLogo: SocialLogoSVG,
  handleClick,
  text,
}: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      className="flex justify-center align-center gap-2 border-gray_5 text-gray_2"
      onClick={handleClick}
    >
      <SocialLogoSVG />
      <span>{text}</span>
    </button>
  );
}

export default SocialLoginButton;
