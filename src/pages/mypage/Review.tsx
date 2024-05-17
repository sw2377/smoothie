import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import SideMenu from "../../components/mypage/SideMenu";
import { getReviews } from "../../store/slices/reviewSlice";
import { getProfile } from "../../store/slices/profileSlice";
import Loading from "../../components/common/Loading";
// import { ReviewDataType } from "../../model/profile.types";

function Review() {
  const [selectedMenu, setSelectedMenu] = useState("review");

  const { isLoading, data: userReviews } = useAppSelector(
    state => state.reviews,
  );
  const { data: userProfile } = useAppSelector(state => state.profiles);

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getReviews(id));
      dispatch(getProfile(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col min-h-screen md:flex-row">
        <SideMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <main className="w-full md:w-3/4 md:px-6 items-start">
          <div className="flex flex-col gap-16 w-full">
            <section>
              <h3 className="mb-4 text-2xl font-bold">
                {userProfile?.user_name} 님과 프로젝트를 함께한 동료
              </h3>
              <p className="pb-4">
                {userProfile?.user_name} 님은 이런 동료입니다!
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {userReviews !== null && userReviews.length > 0
                  ? userReviews.map(review => (
                      <li
                        key={review.id}
                        className="overflow-hidden h-fit border rounded-2xl shadow-sm"
                      >
                        <div className="flex flex-col gap-4 p-4 bg-primary text-white">
                          <span className="inline-block w-full text-xs text-right">
                            {new Date(
                              review.created_at as string | Date,
                            ).toLocaleDateString()}
                          </span>
                          <div className="flex justify-between items-end">
                            <div>
                              <span className="block text-xs">
                                함께한 프로젝트
                              </span>
                              <span className="block font-bold">
                                {review.projects?.title}
                              </span>
                            </div>
                            <div className="overflow-hidden w-[60px] h-[60px] rounded-full">
                              <a href="">
                                <img
                                  className="h-full"
                                  src="https://images.unsplash.com/photo-1642953702322-a5da05d2e36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <span className="block font-bold">
                            {review.title}
                          </span>
                          <p className="text-sm">{review.content}</p>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default Review;
