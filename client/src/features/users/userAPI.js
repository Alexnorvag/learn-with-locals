import API from "../../utils/API";

const API_URL = "/users/";

export const userAPI = {
  fetchAll: async () => {
    try {
      await API.get(`${API_URL}`, {
        results: 2,
        inc: "username,role",
      });
    } catch (e) {
      console.log(`😲 Axios request failed: ${e}`);
    }
  },
};
