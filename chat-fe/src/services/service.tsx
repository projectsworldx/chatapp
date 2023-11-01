import axios from "axios";


const API_URL = "http://localhost:4000";
export let isAuthenticated: boolean = false;

class AuthService {

    async login(params: any) {
        const result = await axios
            .post(API_URL + "/user/login", params);
        const { response } = result.data;
        if (response.success) {
            localStorage.setItem("token", JSON.stringify(response.obj));
            isAuthenticated = true;
            return response.obj;
        }
        else {
            localStorage.removeItem("token");
        }
    }
}

export default new AuthService();