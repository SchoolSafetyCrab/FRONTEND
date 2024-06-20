import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

interface AuthCode {
  phoneNumber: string;
}

const sendAuthCode = async (sendAuth: AuthCode): Promise<boolean> => {
  let result: boolean = false;
  await axios
    .post(`${API_BASE_URL}api/join/send/code`, sendAuth)
    .then(() => {
      result = true;
    })
    .catch((err) => {
      alert(err.response.data.errorMessage);
      result = false;
    });
  return result;
};

export default sendAuthCode;
