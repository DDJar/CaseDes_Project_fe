// import axios from 'axios';
import axios from '../../service/axiosConfig';
async function get() {
    // return await axios.get(process.env.REACT_APP_BASE_URL + 'design-phone-case/');
    return await axios.get( 'design-phone-case/');
}

export default get;
