import type { RootState } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";
import { test } from "../../store/slices/usersSlice";

function UserList() {
  const user = useSelector((state: RootState) => state.users);
  console.log(user);
  const dispatch = useDispatch();

  return (
    <main>
      <h1>UserList</h1>
      <button onClick={() => dispatch(test())}>user</button>
      {/* <span>{user}</span> */}
    </main>
  );
}

export default UserList;
