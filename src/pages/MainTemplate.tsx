import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainTemplate: FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-200 transition-all">
      <Outlet />
    </div>
  );
};

export default MainTemplate;
