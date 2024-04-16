import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/Root";
import Home from "../pages/home/Home";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

import MyPageWrapper from "../pages/mypage/MyPage";
import Summary from "../pages/mypage/Summary";
import Profile from "../pages/mypage/Profile";
import Review from "../pages/mypage/Review";
import MyInfo from "../pages/mypage/MyInfo";

import UserCardList from "../pages/userCardList/UserCardList";
import NewCard from "../pages/userCardList/NewCard";
import EditCard from "../pages/userCardList/EditCard";

import ProjectList from "../pages/projectList/ProjectList";
import ProjectDetail from "../pages/projectList/ProjectDetail";
import NewPost from "../pages/projectList/NewPost";
import EditPost from "../pages/projectList/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      /*** 📌 로그인/회원가입 ***/
      {
        path: "/",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },

      /*** 📌 마이페이지 ***/
      {
        path: "mypage/:id",
        children: [
          { index: true, element: <MyPageWrapper /> },
          // { index: true, element: <Profile /> },
          // { path: "summary", element: <Summary /> },
          // { path: "profile", element: <Profile /> },
          // { path: "review", element: <Review /> },
          // { path: "myinfo", element: <MyInfo /> },
        ],
      },

      /*** 📌 유저카드 ***/
      {
        path: "usercardlist",
        children: [
          { index: true, element: <UserCardList /> },
          { path: "new", element: <NewCard /> },
          { path: "edit/:id", element: <EditCard /> },
        ],
      },

      /*** 📌 프로젝트팀원모집 ***/
      {
        path: "projectlist",
        children: [
          { index: true, element: <ProjectList /> },
          { path: ":id", element: <ProjectDetail /> },
          { path: "new", element: <NewPost /> },
          { path: "edit/:id", element: <EditPost /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
