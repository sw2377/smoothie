import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/Root";
import Home from "../pages/home/Home";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

import UserCardList from "../pages/userCardList/UserCardList";
import NewCard from "../pages/userCardList/NewCard";
import EditCard from "../pages/userCardList/EditCard";

import ProjectList from "../pages/projectList/ProjectList";
import ProjectDetail from "../pages/projectList/ProjectDetail";
import NewPost from "../pages/projectList/NewPost";

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
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
