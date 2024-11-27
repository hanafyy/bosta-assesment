import BostaLayout from "@/customComponents/Layout";
import TrackOrder from "@/pages/TrackOrder";
import { useRoutes } from "react-router-dom";

export default function Routes() {
  const element = useRoutes([
    {
      path: "/",
      element: <BostaLayout />,
      children: [
        {
          path: "/track/orders/:id",
          element: <TrackOrder />,
        },
      ],
    },
  ]);

  return element;
}
