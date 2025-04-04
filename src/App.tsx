import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import Anniversary from "./routes/anniversary";
import AnniversaryThreeMonths from "./routes/anniversary-3-months";

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
        {
          path: "/anniversary-3-months",
          element: <AnniversaryThreeMonths />,
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
