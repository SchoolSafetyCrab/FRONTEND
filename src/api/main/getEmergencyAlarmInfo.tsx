/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
import axios from 'axios';
import { latlng } from '../../interfaces/ToggleInfo';

const getAlarms = async (props: latlng) => {
  const URI = 'https://anjeonhaeyou.site/api/sub/emergency-alarm';

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
    console.error('비상벨 정보 불러오기 오류:', error);
    return null;
  }
};

export default getAlarms;
