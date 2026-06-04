import  { useEffect, useState } from "react";
import useAuth from "../Auth/Store";
import { refreshToken } from "../Services/AuthService";
import toast from "react-hot-toast";
import { Spinner } from "../components/ui/spinner";
import { useNavigate } from "react-router";

const OAuthSuccess = () => {
  const [refreshing, setIsRefreshing] = useState<boolean>(false);
  const changeLocalLoginData = useAuth((state) => state.checkLocalLoginData);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAccessToken() {
      if (!refreshing) {
        // calling rfersh APi
        try {
          setIsRefreshing(true);
          const response = await refreshToken();

          changeLocalLoginData(response.accessToken, response.user, true);
          toast.success("Login Success");
          navigate("/dashboard")
        } catch (error) {
          toast.error("Error while Login !!");
          console.log(error);
          navigate("/oauth/failure")
        } finally {
          setIsRefreshing(false);
        }
      }
    }

    getAccessToken()
  }, []);

  return <div className="flex flex-row justify-center items-center">
    <Spinner />
    <h1 className="p-2 text-2xl">Please wait....</h1>
  </div>;
};

export default OAuthSuccess;
