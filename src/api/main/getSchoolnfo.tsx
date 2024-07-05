/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
import axios from 'axios';
import getLatLng from './getLatLng';

const getSchools = async () => {
  const URI = 'http://apis.data.go.kr/6300000/openapi2022/elSchInfo/getelSchInfo';
  const apiKey = process.env.REACT_APP_OPENAPI_DECODED_KEY;

  try {
    const response = await axios.get(URI, {
      params: {
        serviceKey: apiKey,
        pageNo: 1,
        numOfRows: 148,
      },
    });

    const arr = response.data.response.body.items;
    const promises = arr.map(async (school: any) => {
      try {
        const res = await getLatLng(school.locplc);
        return {
          name: school.schulNm,
          address: school.locplc,
          lat: res.y,
          lng: res.x,
        };
      } catch {
        console.log('getLatLng 하는데 오류남');
        return null;
      }
    });

    const ans = await Promise.all(promises);
    const filteredAns = ans.filter((school) => school !== null);

    console.log('api 내에서의 결과: ', filteredAns);
    return filteredAns;
  } catch (error) {
    console.error('초등학교 정보 불러오기 오류:', error);
    return null;
  }
};

export default getSchools;
