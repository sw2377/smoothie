import { session } from "../../app/supabase";

function Home() {
  console.log("HOME SESSION", session);

  return (
    <main>
      <div>Home</div>
    </main>
  );
}

export default Home;
