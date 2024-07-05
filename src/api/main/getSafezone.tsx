import axios from 'axios';
import { latlng } from '../../interfaces/ToggleInfo';
import API_BASE_URL from '../Apiconfig';

const getSafezones = async (props: latlng) => {
  const URI = `${API_BASE_URL}api/sub/school-zone`;
  console.log('어린이보호 latlng: ', props);
  try {
    const response = await axios.get(URI, {
      params: {
        latitude: props.lat,
        longitude: props.lng,
      },
    });
    console.log('어린이 보호 api 결과: ', response);

    return response.data;
  } catch (error) {
    // console.error('어린이보호구역 정보 불러오기 오류 (데이터가 없을 수 있음):', error);
    return [];
  }
};

export default getSafezones;
