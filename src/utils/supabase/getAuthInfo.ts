import { supabase } from "../../app/supabase";

// Auth Infomation (session)
const authInfo = await supabase.auth.getSession(); // { data, error }
export const session = authInfo.data.session;

// console.log("SUPABASE SESSION", session);

export const getUser = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // console.log("USER", user);
    return user;
  } catch (error) {
    console.log("GET USER ERROR", error);
  }
};
