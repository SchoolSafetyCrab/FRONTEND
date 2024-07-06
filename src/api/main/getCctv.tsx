import axios from 'axios';

const getCctvs = async () => {
  const URL = 'http://apis.data.go.kr/6300000/openapi2022/chsaCCTV/getchsaCCTV';

  const apiKey = process.env.REACT_APP_OPENAPI_DECODED_KEY;

  try {
    const response = await axios.get(URL, {
      params: {
        serviceKey: apiKey,
        numOfRows: 161,
        pageNo: 1,
      },
    });

    console.log('api 내부에서 cctv 불러옴: ', response.data);

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('CCTV 정보 불러오기 오류:', error);
    return [];
  }
};

export default getCctvs;
