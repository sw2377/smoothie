import defaultProfileImg from "../../assets/profile-default.svg";

interface ProfileImgProps {
  avatarUrl: string;
  userName: string;
  style?: string;
}

function ProfileImg({ avatarUrl, userName, style }: ProfileImgProps) {
  return (
    <img
      src={avatarUrl || defaultProfileImg}
      alt={`${userName}님의 프로필 사진`}
      className={`overflow-hidden rounded-full w-full h-full ${style}`}
    />
  );
}

export default ProfileImg;
