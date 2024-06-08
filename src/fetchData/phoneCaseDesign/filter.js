import axios from "../../service/axiosConfig";
async function filterTemplate(data) {
  // return await axios.post(process.env.REACT_APP_BASE_URL + 'design-phone-case/', data);
  return await axios.post("/design-phone-case/filter", data);
}

export default filterTemplate;