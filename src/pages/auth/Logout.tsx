// import { useNavigate } from "react-router";

import ActionButton from "../../components/UI/button/ActionButton";
import { supabase } from "../../app/supabase";

function Logout() {
  // const navigate = useNavigate();

  const SignOut = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log(error);
      }
    }
  };

  return <ActionButton handleClick={SignOut}>Logout</ActionButton>;
}

export default Logout;
