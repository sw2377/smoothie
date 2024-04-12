import { supabase } from "../../app/supabase";

function Home() {
  async function checkLogin() {
    const authInfo = await supabase.auth.getSession();
    const session = authInfo.data.session;

    if (session === null) {
      console.log("🎀 로그아웃 되었어요!");
    } else {
      console.log("🎀 로그인 되었어요!");
    }
  }

  checkLogin();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);
  };
  getUser();

  return (
    <main>
      <div>Home</div>
    </main>
  );
}

export default Home;
