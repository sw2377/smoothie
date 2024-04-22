import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../store";
import { getProfile, modifiedMyInfo } from "../../store/slices/profileSlice";
import SideMenu from "../../components/mypage/SideMenu";
import ActionButton from "../../components/UI/button/ActionButton";

interface ModifiedUserInfoDataType {
  username: string;
  position: string;
}

function MyInfo() {
  const { data } = useAppSelector(state => state.profiles);
  const dispatch = useAppDispatch();

  const userName = data?.user_name;
  const userEmail = data?.email;
  const userImageUrl = data?.avatar_url;
  const userPosition = data?.position;

  // const [userName, setUserName] = useState(data?.user_name);
  // const [userPosition, setUserPosition] = useState(data?.position);

  const [selectedMenu, setSelectedMenu] = useState("myinfo");

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getProfile(id));
    }
  }, [dispatch, id]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ModifiedUserInfoDataType>({});

  const onSubmit: SubmitHandler<ModifiedUserInfoDataType> = data => {
    console.log(data);

    const reqData = {
      user_name: data.username,
      position: data.position,
    };

    console.log("🔖 REQ DATA", reqData);

    if (window.confirm("프로필을 수정하시겠습니까?")) {
      const targetId = id;
      dispatch(modifiedMyInfo({ targetId, reqData }))
        .unwrap()
        .then(() => {
          alert("나의 정보가 수정되었습니다.");
        })
        .catch(error => {
          console.warn("❌ ERROR : MODIFIED USER INFO", error);
          alert(error.message);
        });
    }
  };

  // default value 임시
  useEffect(() => {
    if (data) {
      setValue("username", data.user_name);
      setValue("position", data.position);
    }
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <SideMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <main className="w-full md:w-3/4 md:px-6 items-start">
        <div className="flex flex-col gap-16 w-full">
          <section>
            <h3 className="mb-4 text-2xl font-bold">나의 정보</h3>
            <div className="flex gap-2 justify-end">
              <button className="p-0 border-none text-xs">회원정보 변경</button>
              <button className="p-0 border-none text-xs text-[#EB5757]">
                회원탈퇴
              </button>
            </div>

            {/* 나의 정보 */}
            <div className="flex items-center mt-4 mb-10">
              <div className="m-3 overflow-hidden w-20 h-20 rounded-full">
                <img src={userImageUrl} alt={`${userName}님의 프로필 사진`} />
              </div>
              <div>
                <div className="flex">
                  <span className="block min-w-[70px]">유저네임</span>
                  <span>{userName}</span>
                </div>
                <div className="flex">
                  <span className="block min-w-[70px]">계정</span>
                  <span>{userEmail}</span>
                </div>
                <div className="flex">
                  <span className="block min-w-[70px]">포지션</span>
                  <span>{userPosition}</span>
                </div>
              </div>
            </div>

            {/* 회원정보 변경 */}
            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label className="min-w-20 font-bold">유저네임</label>
                  <input
                    {...register("username", {
                      required: "유저네임을 입력해 주세요.",
                    })}
                    type="text"
                    placeholder="Enter your username"
                    className="w-full"
                  />
                </div>
                {errors.username && (
                  <span className="text-xs text-error text-right">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label className="min-w-20 font-bold">포지션</label>
                  <input
                    {...register("position", {
                      required: "포지션을 입력해 주세요.",
                    })}
                    type="text"
                    placeholder="Enter your password"
                    className="w-full"
                  />
                </div>
                {errors.position && (
                  <span className="text-xs text-error text-right">
                    {errors.position.message}
                  </span>
                )}
              </div>
              <div className="flex gap-2 justify-end">
                <ActionButton
                  type="outline"
                  handleClick={() => {
                    if (window.confirm("회원정보 수정을 취소하시겠습니까?")) {
                      console.log("취소");
                    }
                  }}
                >
                  취소
                </ActionButton>
                <ActionButton handleClick={handleSubmit(onSubmit)}>
                  수정하기
                </ActionButton>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default MyInfo;
