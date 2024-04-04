import { supabase } from "../../app/supabase";

function Home() {
  async function signOut() {
    const { error } = await supabase.auth.signOut();

    console.log(error);
    checkLogin();
  }

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

  return (
    <main>
      <div>Home</div>
      {/* 임시 로그아웃 버튼 */}
      <button onClick={signOut}>로그아웃</button>
    </main>
  );
}

export default Home;
