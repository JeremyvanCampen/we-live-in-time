import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import Anniversary from "./routes/anniversary";
import AnniversaryThreeMonths from "./routes/anniversary-3-months";
import FamilyWeekend from "./routes/family-weekend";

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
        {
          path: "/family-weekend",
          element: <FamilyWeekend />,
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
