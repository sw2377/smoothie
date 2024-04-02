import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/Root";
import Home from "../pages/home/Home";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

import UserList from "../pages/userList/UserList";

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

      /*** 📌 팀찾기 ***/
      {
        path: "userlist",
        children: [{ index: true, element: <UserList /> }],
      },

      /*** 📌 팀원찾기 ***/
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
