import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import {Toaster} from "react-hot-toast";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
       <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            minWidth: "120px",
            padding: "6px 10px",
            fontSize: "15px",
          },
        }}
      />
      <Navbar />
      <main className="flex-1 w-full px-2 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
