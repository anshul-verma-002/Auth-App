import { create } from "zustand";
import type User from "../Models/User";
import { loginUser, logoutUser } from "../Services/AuthService";
import type LoginData from "../Models/LoginData";
import type LoginResponseData from "../Models/LoginResponseData";
import { persist } from "zustand/middleware";

const TOKEN_KEY = "auth_app";

// type AuthStatus = "idle" | "authenticating" | "authenticated" | "anonymus";

//global auth this.state

type AuthState = {
  accessToken: string | null;
  user: User | null;
  authStatus: boolean;
  authLoading: boolean;
  login: (logindata: LoginData) => Promise<LoginResponseData>;
  logout: (silent?: boolean) => void;
  checkLogin: () => boolean;
  updateUser: (user: User) => void;
  // uploadFile: (user: User)=> void;
  updateUserData: (user:User) => void;

  checkLocalLoginData:(accessToken:string,user:User,authStatus:boolean)=>void;
};

// main logic for global state

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      login: async (logindata) => {
        console.log("started login...");
        set({ authLoading: true });

        try {
          const loginResponseData = await loginUser(logindata);
          // console.log(loginResponseData);
          set({
            accessToken: loginResponseData.accessToken,
            user: loginResponseData.user,
            authStatus: true,
          });
          return loginResponseData;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          set({
            authLoading: false,
          });
        }
      },

      updateUserData : async (user) =>{
        set({
          user : user
        })
      },

      logout: async (silent = false) => {
        // try {
        //     await logoutUser();
        // } catch (error) {}
        await logoutUser();
        set({
          accessToken: null,
          user: null,
          authStatus: false,
          authLoading: false,
        });
      },
      updateUser: (user) => {
        set({
          user: user,
        });
      },

      checkLogin: () => {
        if (get().accessToken && get().authStatus) {
          return true;
        } else {
          return false;
        }
      },

      checkLocalLoginData:(accessToken,user,authStatus)=>{
        set({
          accessToken,
          user,
          authStatus
        })
      }
    }),
    { name: TOKEN_KEY },
  ),
);

export default useAuth;
