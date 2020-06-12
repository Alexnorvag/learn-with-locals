import API from "../../utils/API";

const API_URL = "api/auth/register";

export const authAPI = {
  register: async (userInfo) => {
    try {
      return await API.post(`${API_URL}`, userInfo);
    } catch (e) {
      console.log(`😲 Axios request failed: ${e}`);
    }
  },
};
