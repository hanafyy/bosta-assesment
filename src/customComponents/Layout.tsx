import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Separator } from "@/components/ui/separator";

function BostaLayout() {
  return (
    <div className="w-full h-full min-h-screen ">
      <Navbar />
      <Separator />
      <Outlet />
    </div>
  );
}

export default BostaLayout;
