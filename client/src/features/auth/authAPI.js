import API from "../../utils/API";

const API_URL = "/auth/login";

export const userAPI = {
  register: async (userInfo) => {
    try {
      return await API.post(`${API_URL}`, userInfo);
    } catch (e) {
      console.log(`😲 Axios request failed: ${e}`);
    }
  },
};
