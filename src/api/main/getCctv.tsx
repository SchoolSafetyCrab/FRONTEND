import axios from 'axios';

const GetCctvInfo = async () => {
  const URL = 'http://apis.data.go.kr/6300000/openapi2022/chsaCCTV/getchsaCCTV';

  // const apiKey = process.env.REACT_APP_DATA_API_KEY;

  // const apiKey = process.env.REACT_APP_JONG_API_KEY;

  // if (!apiKey) {
  //   console.error('API 키가 설정되지 않았습니다.');
  //   return null;
  // }

  try {
    const response = await axios.get(URL, {
      params: {
        serviceKey:
          'AFzKE5%2F1X0FjJKbRzy1bXjVdwMF44BHyDNLs%2FP77lMM6da5WqM224hZ5OgNFTn8vaPYrplHrUZXl6in%2FE%2BCjGw%3D%3D',
        numOfRows: 161,
        pageNo: 1,
      },
    });

    console.log(response.data);

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('CCTV 정보 불러오기 오류:', error);
    return null;
  }
};

export default GetCctvInfo;
