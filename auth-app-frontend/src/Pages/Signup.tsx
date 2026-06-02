import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import type RegisterData from "../Models/RegisterData";
import { registerUser } from "../Services/AuthService";
import { Spinner } from "../components/ui/spinner";


const Signup = () => {
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(data);

    if(data.name.trim() === ""){
      toast.error("Name is Required !")
      return;
    }

    if(data.email.trim() === ""){
      toast.error("Email is Required !")
      return;
    }

    if(data.password.trim() === ""){
      toast.error("Password is Required !")
      return;
    }

  // form submit for registration/ server call

  try{
    setLoading(true)
    const res = await registerUser(data)
    console.log(res)
    toast.success("User Registered Successfully ")
    setData({
      name: "",
    email: "",
    password: ""
    });
    navigate("/login")
  }catch(error){
    console.log(error)
    toast.success("error in registering the user")
  }finally{
    setLoading(false)
  }

  };


  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="flex flex-col w-full max-w-md text-center p-3 gap-4 m-2 rounded-md dark:bg-slate-900 bg-white border dark:border-slate-700 border-slate-300 shadow-xl dark:shadow-black/40 shadow-slate-300/60">
        {/* Heading */}
        <div>
          <div className="font-semibold text-md dark:text-white text-slate-900">
            Create Account
          </div>

          <div className="text-xs text-slate-500">
            Create your Account to Continue
          </div>
        </div>

        {/* Divider */}
        <div className="flex flex-row gap-2 justify-center items-center">
          <hr className="flex-1 border-slate-300 dark:border-slate-700" />

          <div className="text-[12px] text-slate-500 whitespace-nowrap">
            CREATE ACCOUNT ON AUTH APP
          </div>

          <hr className="flex-1 border-slate-300 dark:border-slate-700" />
        </div>

        
        {/* Form */}
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col text-[14px] w-full gap-3 dark:text-slate-400 text-slate-700"
        >
          {/* Name */}
          <div className="flex w-full flex-col items-start gap-1">
            <span className="pl-1">Name</span>

            <div className="flex flex-row text-xs justify-start items-center gap-2 pl-2 h-full w-full rounded-md border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white">
              <User size={18} />

              <input
                type="text"
                placeholder="John doe"
                className="h-10 w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex w-full flex-col items-start gap-1">
            <span className="pl-1">Email</span>

            <div className="flex flex-row text-xs justify-start items-center gap-2 pl-2 h-full w-full rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-800 bg-slate-100 text-slate-700 dark:text-white">
              <Mail size={18} />

              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="h-10 w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex w-full flex-col items-start gap-1">
            <span className="pl-1">Password</span>

            <div className="flex flex-row text-xs justify-start items-center gap-2 pl-2 pr-2 h-full w-full rounded-md border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white">
              <Lock size={18} />

              <input
                type="password"
                placeholder="your-password"
                className="h-10 w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                name="password"
                value={data.password}
                onChange={handleInputChange}
                
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
           disabled = {loading}
            type="submit"
            className="text-xs text-white font-semibold bg-gradient-to-r from-blue-500 to-violet-500  transition-all duration-200 hover:-translate-y-0.5 active:scale-95 rounded-md h-10 w-full
            flex flex-row justify-center items-center gap-1"
          >
           {
            loading ? <><Spinner />Please wait...  </> : "Create Account"
           } 
          </button>
        </form>

        {/* Bottom Text */}
        <div className="flex justify-center items-center text-[15px] gap-1 dark:text-slate-300 text-slate-700">
          Already have an account?
          <NavLink
            to={"/login"}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
