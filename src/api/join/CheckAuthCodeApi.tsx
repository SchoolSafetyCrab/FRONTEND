import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

interface CheckAuthCode {
  phoneNumber: string;
  authCode: string;
}

const checkCode = async (checkAuthCode: CheckAuthCode): Promise<boolean> => {
  let result: boolean = false;
  await axios
    .post(`${API_BASE_URL}api/join/check/code`, checkAuthCode)
    .then(() => {
      result = true;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.errorMessage || 'An unknown error occurred');
      } else {
        alert('An unknown error occurred');
      }
      result = false;
    });

  return result;
};

export default checkCode;
