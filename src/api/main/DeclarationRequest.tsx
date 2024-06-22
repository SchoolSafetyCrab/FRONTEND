import axios from 'axios';
import API_BASE_URL from '../Apiconfig';

interface DeclarationDto {
  latitude: string;
  longitude: string;
  title: string;
  detail: string;
  images: string[];
}

const declarationRequest = async (declarationDto: DeclarationDto): Promise<boolean> => {
  let result: boolean = false;
  await axios
    .post(`${API_BASE_URL}api/declaration`, declarationDto)
    .then((res) => {
      console.log(res);
      result = true;
    })
    .catch(() => {
      alert('신고 요청 실패');
      result = false;
    });
  return result;
};
export default declarationRequest;
