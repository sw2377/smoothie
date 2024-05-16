import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { signOut } from "../../store/slices/authSlice";

import ActionButton from "../../components/UI/button/ActionButton";
import { clearProfile } from "../../store/slices/profileSlice";

function Logout() {
  const { isLoading } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogoutBtnClick = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(signOut()).then(() => {
        navigate("/");
        window.location.reload(); // 임시
      });
      dispatch(clearProfile());
    }
  };

  return (
    <ActionButton handleClick={handleLogoutBtnClick}>
      {isLoading ? "......" : "Logout"}
    </ActionButton>
  );
}

export default Logout;
