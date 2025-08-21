import axios, { type AxiosResponse } from "axios";

export type RegisterPayload = {
	username: string;
	email: string;
	password: string;
};
export type LoginPayload = {
	email: string;
	password: string;
};

const registerUser = (data: RegisterPayload): Promise<AxiosResponse<any>> => {
	return axios.post("/api/user/register", data);
};
const loginUser = (data: LoginPayload): Promise<AxiosResponse<any>> => {
	return axios.post("/api/user/login", data);
};
const AuthService = { registerUser,loginUser };

export default AuthService; 