// import axios from 'axios';
import axios from '../../service/axiosConfig';
async function getById(id) {
  //  return await axios.get(process.env.REACT_APP_BASE_URL + 'design-phone-case/' + id);
    return await axios.get('design-phone-case/' + id);
}
export default getById;
