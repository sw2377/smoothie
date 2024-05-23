import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { signOut } from "../../store/slices/authSlice";
import { clearProfile } from "../../store/slices/profileSlice";
import ActionButton from "../../components/UI/button/ActionButton";
import Loading from "../../components/common/Loading";

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
    <>
      {isLoading && <Loading />}
      <ActionButton handleClick={handleLogoutBtnClick}>Logout</ActionButton>
    </>
  );
}

export default Logout;
