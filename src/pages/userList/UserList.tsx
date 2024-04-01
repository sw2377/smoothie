import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/index";

import type { RootState } from "../../store/index";
import { fetchUserCardList } from "../../store/slices/userListSlice";

function UserList() {
  const user = useSelector((state: RootState) => state.users);
  console.log(user);
  const dispatch = useAppDispatch();

  /** FETCH 모든 유저 카드 조회 */
  useEffect(() => {
    getUserCards();
  }, []);

  const getUserCards = () => {
    console.log("🚀 GET USER LIST");

    dispatch(fetchUserCardList())
      .unwrap()
      .catch(err => {
        console.warn("🚀 GET USERLIST ERROR: ", err.message);
      });
  };

  return (
    <main>
      <h1>UserList</h1>
      {/* {state.map(state => (
        <li key={state.title}>{state.title}</li>
      ))} */}
    </main>
  );
}

export default UserList;
