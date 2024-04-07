import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/Root";
import Home from "../pages/home/Home";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

import UserList from "../pages/userList/UserList";
import NewCard from "../pages/userList/NewCard";
import EditCard from "../pages/userList/EditCard";

import ProjectList from "../pages/projectList/ProjectList";
import ProjectDetail from "../pages/projectList/ProjectDetail";

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
        path: "userlist",
        children: [
          { index: true, element: <UserList /> },
          { path: "new", element: <NewCard /> },
          { path: "edit/:id", element: <EditCard /> },
        ],
      },

      /*** 📌 프로젝트팀원모집 ***/
      {
        path: "projectlist",
        children: [
          { index: true, element: <ProjectList /> },
          { path: ":projectId", element: <ProjectDetail /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
