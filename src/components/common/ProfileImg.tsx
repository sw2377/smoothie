/**
 * 필요한 data
 * 프로필 이미지 -> avatar_url || default profile img
 * 프로필 유저네임 (이미지 alt에도 필요)
 *
 * header : 나의 프로필 사진 (클릭시 나의 마이페이지로 이동) / 유저네임
 * mypage sidebar : 해당 유저의 프로필 사진 (클릭 X)
 * mypage summary : 해당 유저의 프로필 사진 (클릭 X)
 * mypage review : 리뷰 작성한 유저의 프로필 사진 (클릭시 해당 유저의 마이페이지로 이동)
 * 프로필카드 게시판 카드 뒷면 : 해당 유저의 프로필 사진 (클릭시 해당 유저의 마이페이지로 이동)
 * 팀원모집 게시판 상세페이지 : 작성자의 프로필 사진 (클릭시 작성자의 마이페이지로 이동)
 */

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
      className={`overflow-hidden rounded-full w-[60px] h-[60px] ${style}`}
    />
  );
}

export default ProfileImg;
