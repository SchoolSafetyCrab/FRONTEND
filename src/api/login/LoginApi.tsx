import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

const ACCESS_TOKEN = 'Access_token';

// 인터페이스 정의
interface UserDto {
  id: string;
  password: string;
}

// 로그인 함수 정의
const login = (userDto: UserDto): void => {
  axios
    .post(`${API_BASE_URL}api/login`, userDto)
    .then((res) => {
      const jwt = res.headers.authorization;
      if (jwt) {
        localStorage.setItem(ACCESS_TOKEN, jwt);
        window.location.href = '/main';
      }
    })
    .catch(() => {
      alert("로그인 실패");
    });
};

export default login;
