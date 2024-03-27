import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layout/Root";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import ProjectList from "./pages/projectList/ProjectList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      /*** 📌 팀찾기 ***/
      {
        path: "userlist",
        children: [{ index: true, element: <UserList /> }],
      },

      /*** 📌 팀원찾기 ***/
      {
        path: "projectlist",
        children: [{ index: true, element: <ProjectList /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
