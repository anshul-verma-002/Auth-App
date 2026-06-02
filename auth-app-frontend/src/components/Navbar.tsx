import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Home, MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "../Auth/Store";

const Navbar = () => {
  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout  = useAuth((state)=> state.logout);
  const  navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  return (
    <nav className="flex flex-col md:flex-row justify-around items-center md:h-14 gap-2 md:gap-0 py-2 md:py-0 dark:bg-slate-950 bg-white border-b dark:border-slate-800 border-slate-200 shadow-sm">
      {/* Logo */}
      <div className="font-semibold flex gap-2 items-center">
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm shadow-md">
          A
        </span>

        <NavLink to={"/"}>
          <span className="text-base tracking-tight dark:text-white text-slate-900">
            Auth App
          </span>
        </NavLink>
      </div>

      {/* Nav Links */}
      <div className="flex items-center justify-around md:gap-4 gap-2">
        <button onClick={toggleTheme}>
          {darkMode ? (
            <SunIcon size={22} className="text-yellow-400 cursor-pointer" />
          ) : (
            <MoonIcon size={22} className="text-slate-800 cursor-pointer" />
          )}
        </button>

        {checkLogin() ? (
          <>
         
           <NavLink
              to={"/dashboard"}
              className="text-sm dark:text-slate-300 text-slate-700 hover:text-blue-500 transition-all duration-200 hover:-translate-y-0.5 border px-2 py-1 rounded-md dark:border-slate-700 border-gray-400"
            >
              <Home />
            </NavLink>

            <NavLink
              to={"/dashboard/profile"}
              className="text-sm dark:text-slate-300 text-slate-700 hover:text-blue-500 transition-all duration-200 hover:-translate-y-0.5 border px-2 py-1 rounded-md dark:border-slate-700 border-gray-400 w-20 truncate"
            >
              {user?.name}
            </NavLink>

            <NavLink to={"/"}>
              <Button
                size={"sm"}
                variant={"outline"}
                className="cursor-pointer dark:bg-slate-900 bg-slate-100 dark:border-slate-700 border-slate-300 dark:text-white text-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border-gray-400 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                onClick={()=>{
                  logout();
                  navigate("/")
                }}
              >
                Logout
              </Button>
            </NavLink>
          </>
        ) : (
          <>
            {" "}
            <NavLink
              to={"/"}
              className="text-sm dark:text-slate-300 text-slate-700 hover:text-blue-500 transition-all duration-200 hover:-translate-y-0.5"
            >
              Home
            </NavLink>
            <NavLink to={"/login"}>
              <Button
                size={"sm"}
                variant={"outline"}
                className="cursor-pointer dark:bg-slate-900 bg-slate-100 dark:border-slate-700 border-slate-300 dark:text-white text-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border-gray-400 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                Login
              </Button>
            </NavLink>
            <NavLink to={"/signup"}>
              <Button
                size={"sm"}
                variant={"outline"}
                className="cursor-pointer dark:bg-slate-900 bg-slate-100 border-gray-400 dark:text-white text-black transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                Signup
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
