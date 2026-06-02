import type RegisterData from "../Models/RegisterData";
import type LoginData from "../Models/LoginData";
import apiClient from "../Config/ApiClient";
import type LoginResponseData from "../Models/LoginResponseData";
import type UpdateUser from "../Models/UpdateUser";
import type User from "../Models/User";

export const registerUser = async (signupData:RegisterData) =>{

// api call to save user data
const res = await apiClient.post('/auth/register', signupData);
return res.data;

}

export const loginUser = async (loginData:LoginData) =>{

// api call to login user
const res = await apiClient.post<LoginResponseData>('/auth/login', loginData);
return res.data;

}

export const logoutUser = async ()=>{
   const res = await apiClient.post('auth/logout');
   return res.data;
}


// api call to update User

export const updateUserInfo = async (updateUser:UpdateUser) =>{
const res = await apiClient.put<User>('/users/update', updateUser);
return res.data;
}

// refresh token request

export const refreshToken = async () =>{
const res = await apiClient.post<LoginResponseData>('/auth/refresh');
return res.data;
}

