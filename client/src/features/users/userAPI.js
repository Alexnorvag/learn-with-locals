import API from "../../utils/API";

const API_URL = "/user/";

export const userAPI = {
  fetchAll: async () => {
    try {
      return await API.get(`${API_URL}`, {
        results: 2,
        inc: "username,role",
      });
    } catch (e) {
      console.log(`😲 Axios request failed: ${e}`);
    }
  },
};
