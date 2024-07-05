import axios from 'axios';

const getLatLng = async (address: string) => {
  const URI = 'https://dapi.kakao.com/v2/local/search/address';

  try {
    const response = await axios.get(URI, {
      params: {
        query: address,
      },
      headers: {
        Authorization: 'KakaoAK dc5e502c1147267d724058fb9e9cc96c',
      },
    });

    return response.data.documents[0];
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
};

export default getLatLng;
