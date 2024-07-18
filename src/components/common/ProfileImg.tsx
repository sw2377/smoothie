import defaultProfileImg from "../../assets/profile-default.svg";

interface ProfileImgProps {
  avatarUrl: string;
  userName: string;
  size?: string;
}

function ProfileImg({ avatarUrl, userName, size }: ProfileImgProps) {
  return (
    <img
      src={avatarUrl || defaultProfileImg}
      alt={`${userName}님의 프로필 사진`}
      className={`overflow-hidden rounded-full ${size ? size : "w-full h-full"}`}
    />
  );
}

export default ProfileImg;
