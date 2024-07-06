/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import axios from 'axios';

const getTrafficLights = async () => {
  const URL = 'https://apis.data.go.kr/6300000/GetTrsnListService1/getTrsnList1';

  const key = process.env.REACT_APP_OPENAPI_DECODED_KEY;
  try {
    const response = await axios.get(URL, {
      params: {
        serviceKey: key,
        numOfRows: 20149,
        pageNo: 1,
        type: 'json',
        TFCLGHTSE: '02',
      },
    });

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('신호등 정보 불러오기 오류:', error);
    return null;
  }
};

export default getTrafficLights;
