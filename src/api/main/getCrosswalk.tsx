import axios from 'axios';

const getCrosswalks = async () => {
  const URL = 'http://apis.data.go.kr/6300000/GetPdcrListService1/getPdcrList1';

  const apiKey = process.env.REACT_APP_OPENAPI_DECODED_KEY;

  try {
    const response = await axios.get(URL, {
      params: {
        serviceKey: apiKey,
        numOfRows: 9393,
        pageNo: 1,
        type: 'json',
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('횡단보도 정보 불러오기 오류:', error);
    return [];
  }
};

export default getCrosswalks;
