import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainTemplate: FC = () => {
  return <div className="w-full min-h-screen bg-neutral-800">
    <Outlet />
  </div>;
};

export default MainTemplate;
