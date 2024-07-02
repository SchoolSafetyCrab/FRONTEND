import axios from 'axios';
import { latlng } from '../../interfaces/ToggleInfo';

const getAccidentSites = async (props: latlng) => {
  const URI = 'https://anjeonhaeyou.site/api/sub/accident-site';

  console.log(' 사고우발지 latlng: ', props);
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
    console.error('사고우발지 정보 불러오기 오류:', error);
    return null;
  }
};

export default getAccidentSites;
