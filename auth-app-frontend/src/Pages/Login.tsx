import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { CircleX, Lock, Mail } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import type LoginData from "../Models/LoginData";
import toast from "react-hot-toast";
import { Alert, AlertTitle } from "../components/ui/alert";
import { Spinner } from "../components/ui/spinner";
import useAuth from "../Auth/Store";

const Login = () => {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  const login = useAuth((state) => state.login);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    // console.log(data);

    if (data.email.trim() === "") {
      toast.error("Name is Required !");
      return;
    }

    if (data.password.trim() === "") {
      toast.error("Password is Required !");
      return;
    }

    // form submit for registration/ server call

    try {
      setLoading(true);
      // const res = await loginUser(data);

      const res = await login(data);
      console.log(res);

      toast.success("Login success ");
      setData({
        email: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      toast.error("Error !!");

      if (error?.status == 400) {
        setError(error);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center pt-20">
      <div className="flex flex-col w-full max-w-md text-center p-3 gap-5 m-2  light:border-slate-200  rounded-md dark:bg-slate-900 bg-white border dark:border-slate-700 border-slate-300 shadow-xl dark:shadow-black/40 shadow-slate-300/60">
        <div>
          <div className="font-semibold text-md dark:text-white text-slate-900">
            Welcome Back
          </div>

          <div className="text-xs text-slate-500">
            Sign in to your Account to Continue
          </div>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <NavLink
            to={`${import.meta.env.VITE_BASE_URL || "https://auth-app-ecfg.onrender.com"}/oauth2/authorization/google`}
          >
            <Button
              className="border dark:border-slate-600 light:border-slate-300 text-white font-monospace dark:bg-slate-800 light:bg-slate-100 font-light text-xs hover:-translate-y-0.5 transition-all duration-200 hover:scale-105 active:scale-95"
              type="button"
            >
              <FcGoogle />
              Google
            </Button>
          </NavLink>

          <NavLink
             to={`${import.meta.env.VITE_BASE_URL || "https://auth-app-ecfg.onrender.com"}/oauth2/authorization/github`}
          >
            <Button
              className="border dark:border-slate-600 light:border-slate-300 dark:text-white text-white font-monospace dark:bg-slate-800 light:bg-slate-100 font-light text-xs hover:-translate-y-0.5 transition-all duration-200 hover:scale-105 active:scale-95"
              type="button"
            >
              <FaGithub />
              Github
            </Button>
          </NavLink>
        </div>

        {/* Error */}
        {error && (
          <div className="w-full border-red-500 border-1 rounded-md">
            <Alert variant={"destructive"} className="py-2 px-3 text-xs">
              <CircleX className="h-4 w-4" />

              <AlertTitle className="text-xs font-medium">
                {error.response
                  ? error?.response?.data?.message
                  : error?.message}
              </AlertTitle>
            </Alert>
          </div>
        )}

        <div className="flex flex-row gap-2 justify-center items-center">
          <hr className="flex-1 border-slate-300 dark:border-slate-700" />

          <div className="text-[12px] text-slate-500">
            OR CONTINUE WITH EMAIL
          </div>

          <hr className="flex-1 border-slate-300 dark:border-slate-700" />
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmitForm}>
          <div className="flex flex-col text-[14px] w-full max-w-md dark:text-slate-400 light:text-slate-700 gap-3">
            <div className="flex w-full max-w-md flex-col items-start gap-1">
              <span className="pl-1">Email</span>

              <div className="flex flex-row text-xs justify-start border border-slate-300 dark:border-slate-600 h-full w-full rounded-md items-center gap-2 pl-2 dark:bg-slate-800 light:bg-slate-100 dark:text-white text-slate-900">
                <Mail size={18} />

                <input
                  type="text"
                  placeholder="youremail@gmail.com"
                  className="h-10 w-full max-w-md bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all duration-200"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex w-full max-w-md flex-col items-start gap-1">
              <span className="pl-1">Password</span>

              <div className="flex flex-row text-xs justify-start border border-slate-300 dark:border-slate-600 h-full w-full rounded-md items-center gap-2 pl-2 pr-2 dark:bg-slate-800 light:bg-slate-100 dark:text-white text-slate-900">
                <Lock size={18} />

                <input
                  type="password"
                  placeholder="your-password"
                  className="h-10 w-full max-w-md bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all duration-200"
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="text-xs text-white font-semibold bg-gradient-to-r from-blue-500 to-violet-500  h-full w-full rounded-md items-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer">
            <button
              disabled={loading}
              type="submit"
              className="h-10 w-full max-w-md cursor-pointer bg-transparent focus:outline-none flex flex-row justify-center items-center gap-1"
            >
              {loading ? (
                <>
                  <Spinner /> Please wait...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="flex justify-center items-center text-[15px] gap-1 dark:text-slate-300 light:text-slate-700">
          Don't have account?
          <NavLink
            to={"/signup"}
            className={"text-blue-500 hover:text-blue-600 transition-colors"}
          >
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
