import axios from 'axios';
import { latlng } from '../../interfaces/ToggleInfo';

const getSafezones = async (props: latlng) => {
  const URI = 'https://anjeonhaeyou.site/api/sub/school-zone';

  console.log('latlng: ', props);
  try {
    const response = await axios.get(URI, {
      params: {
        latitude: props.lat,
        longitude: props.lng,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('어린이보호구역 정보 불러오기 오류:', error);
    return null;
  }
};

export default getSafezones;