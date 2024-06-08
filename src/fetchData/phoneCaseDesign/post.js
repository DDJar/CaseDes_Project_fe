// import axios from 'axios';
import axios from "../../service/axiosConfig";
async function post(data) {
  // return await axios.post(process.env.REACT_APP_BASE_URL + 'design-phone-case/', data);
  return await axios.post("/design-phone-case/", data);
}

export default post;
