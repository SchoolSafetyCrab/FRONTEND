import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

// 인터페이스 정의
interface UserDto {
  id: string;
  password: string;
}

// 로그인 함수 정의
const login = async (userDto: UserDto): Promise<boolean> => {
  let result: boolean = false;
  await axios
    .post(`${API_BASE_URL}api/login`, userDto)
    .then((res) => {
      const jwt = res.headers.authorization;

      if (jwt) {
        const ACCESS_TOKEN = 'ACCESS_TOKEN';
        localStorage.setItem(ACCESS_TOKEN, jwt);
        result = true;
      }
    })
    .catch(() => {
      alert('로그인 실패');
      result = false;
    });
  return result;
};

export default login;
