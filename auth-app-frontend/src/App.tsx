import {
  ArrowRight,
  Check,
  Clock,
  Globe,
  KeyRound,
  Lock,
  Mail,
  ShieldCog,
  ShieldMinus,
  UserPlus,
} from "lucide-react";

import { Button } from "./components/ui/button";
import Card from "./Pages/Card.tsx";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router";

const App = () => {
  const arr = [
    {
      name: "JWT Authentication",
      sign: Lock,
      text:
        "Secure user authentication using JWT access tokens for protected routes and verified API requests across your application.",
      tick: Check,
    },

    {
      name: "Refresh Tokens",
      sign: KeyRound,
      text:
        "Maintain persistent login sessions securely with refresh tokens and automatic access token regeneration.",
      tick: Check,
    },

    {
      name: "Google & GitHub",
      sign: Globe,
      text:
        "Enable fast and seamless social authentication using Google and GitHub OAuth login integration.",
      tick: Check,
    },

    {
      name: "Login & Signup",
      sign: UserPlus,
      text:
        "Complete authentication flow with secure signup, login validation, password protection, and user account management.",
      tick: Check,
    },
  ];

  return (
    <div className="relative flex flex-col w-full min-h-screen text-center justify-between gap-16 overflow-hidden px-4 py-10 bg-gradient-to-b from-blue-50 via-white to-violet-50 dark:from-black dark:via-slate-950 dark:to-slate-900 dark:text-white text-slate-900">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 bg-blue-400/20 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 h-72 w-72 bg-violet-400/20 blur-3xl rounded-full" />

      {/* HERO SECTION */}
      <div className="relative flex flex-col gap-7 items-center">

        {/* Badge */}
        <div>
          <Button
            className="rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-md px-4"
            size={"sm"}
          >
            <ShieldCog size={40} className="text-blue-800" />

            <div className="text-[13px] dark:text-white font-semibold text-blue-400">
              Secure auth made simple
            </div>
          </Button>
        </div>

        {/* Heading */}
        <div className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-5xl">

          Classic Authentication for{" "}

          <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
            modern Apps
          </span>

        </div>

        {/* Description */}
        <div className="max-w-2xl text-[15px] md:text-lg font-light dark:text-gray-300 text-gray-600 leading-relaxed">

          Fast, reliable, and seamless login experience with
          Google, GitHub, JWT authentication, refresh tokens,
          and secure email-based authentication systems.

        </div>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-3 justify-center flex-wrap">

          <Button
            className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white shadow-lg shadow-blue-400/30 border-0 px-6"
            size={"sm"}
          >
            <div>Get Started Free</div>

            <ArrowRight size={18} />
          </Button>

          <NavLink to={"/login"}>
            <Button
              className="rounded-xl border border-slate-300 bg-white/70 backdrop-blur-md hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800 px-6"
              size={"sm"}
              variant={"outline"}
            >
              Login
            </Button>
          </NavLink>

        </div>

      </div>

      {/* TECH STACK STRIP */}
      <div className="relative rounded-2xl flex flex-col md:flex-row md:justify-around py-4 text-sm dark:text-gray-300 text-gray-700 border dark:border-neutral-700 border-gray-200 gap-4 items-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl w-full px-6 shadow-lg shadow-blue-100 dark:shadow-black/20">

        <div className="flex flex-row items-center gap-2">
          <Lock className="text-blue-500" />
          JWT Auth
        </div>

        <div className="flex flex-row items-center gap-2">
          <Globe className="text-violet-500" />
          OAuth Login
        </div>

        <div className="flex flex-row items-center gap-2">
          <Clock className="text-green-500" />
          Refresh Tokens
        </div>

        <div className="flex flex-row items-center gap-2">
          <ShieldMinus className="text-red-500" />
          Robust Security
        </div>

      </div>

      {/* FEATURES HEADING */}
      <div className="relative flex flex-col gap-2">

        <span className="text-3xl font-bold tracking-tight">
          Why Choose Auth App?
        </span>

        <span className="text-sm dark:text-gray-400 text-gray-600">
          Everything you need to plug authentication into your project
        </span>

      </div>

      {/* CARDS SECTION */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {arr.map(function (elem, index) {
          return (
            <div
              key={index}
              className="
                group
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                hover:shadow-blue-200/40
                dark:hover:shadow-blue-900/20
              "
            >
              <Card
                name={elem.name}
                sign={elem.sign}
                text={elem.text}
                check={elem.tick}
              />
            </div>
          );
        })}

      </div>

      {/* SECURITY INFO */}
      <div className="relative flex flex-col gap-4 text-left rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-5 shadow-lg shadow-slate-200/50 dark:shadow-black/20">

        <div className="flex items-center gap-2 text-base font-semibold dark:text-white text-slate-900">

          <Lock size={18} className="text-blue-500" />

          Secure Authentication

        </div>

        <div className="grid grid-cols-2 gap-4 text-[13px] dark:text-slate-400 text-slate-600">

          <div className="flex items-center gap-2">
            <FcGoogle size={18} />
            Google OAuth
          </div>

          <div className="flex items-center gap-2">
            <FaGithub size={18} />
            GitHub OAuth
          </div>

          <div className="flex items-center gap-2">
            <Lock size={14} className="text-blue-500" />
            JWT Access Tokens
          </div>

          <div className="flex items-center gap-2">
            <Mail size={14} className="text-violet-500" />
            Email Login
          </div>

        </div>

        <div className="flex justify-between items-center text-[12px] dark:text-slate-500 text-slate-600 border-t border-slate-200 dark:border-slate-700 pt-3">

          <span>
            Session protected with Refresh Tokens
          </span>

          <span className="text-green-500 font-semibold">
            Secure
          </span>

        </div>

      </div>

      {/* FINAL CTA */}
      <div className="relative flex flex-col items-center gap-5 py-10 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-2xl shadow-violet-300/30">

        <div className="text-3xl md:text-5xl font-bold tracking-tight">

          Start building secure apps today

        </div>

        <div className="max-w-2xl text-sm md:text-lg text-blue-100 px-4">

          Complete authentication system with JWT,
          OAuth 2.0, refresh tokens and protected routes
          ready for production-level applications.

        </div>

        <Button
          className="rounded-xl bg-white text-black hover:bg-slate-200 px-6"
          size={"lg"}
        >
          <NavLink to={"/signup"}>
          Create Free Account
          </NavLink>
        </Button>

      </div>

      {/* FOOTER */}
      <div className="relative flex flex-col gap-3 pt-5 border-t border-slate-200 dark:border-slate-700">

        <div className="flex justify-center gap-5 text-[13px] dark:text-slate-400 text-slate-600 flex-wrap">

          <a
            href="#"
            className="hover:text-blue-500 transition-colors"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="hover:text-blue-500 transition-colors"
          >
            Terms
          </a>

          <a
            href="#"
            className="hover:text-blue-500 transition-colors"
          >
            Support
          </a>

        </div>

        <div className="text-[12px] dark:text-slate-500 text-slate-600">

          Protected with JWT Authentication, OAuth 2.0 and Refresh Tokens

        </div>

      </div>
    </div>
  );
};

export default App;