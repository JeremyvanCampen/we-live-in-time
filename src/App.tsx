import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import Anniversary from "./routes/anniversary";

function App() {
  const router = createBrowserRouter([
    {
      element: <Outlet />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/anniversary",
          element: <Anniversary />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
