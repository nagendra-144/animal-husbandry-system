import axios from "axios";

const API = axios.create({
  baseURL: "https://animal-husbandry-system.onrender.com/api"
});

export default API;