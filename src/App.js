import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserHome from "./pages/UserHome";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import NewUser from "./pages/NewUserHome";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new-user",
        element: <NewUser />,
      },
      {
        path: "/dashboard/:uid",
        element: <UserHome />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
