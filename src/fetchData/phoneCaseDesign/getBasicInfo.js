// import axios from "axios"
import axios from '../../service/axiosConfig';
async function getBasicInfo(){
// return await axios.get(process.env.REACT_APP_BASE_URL + 'design-phone-case/basic-info')
return await axios.get('design-phone-case/basic-info')
}
export default getBasicInfo