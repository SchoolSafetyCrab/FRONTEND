import jsonp from 'jsonp';

const getSafehouses = async (lat: number, lng: number) => {
  const URI = 'http://api.vworld.kr/req/data';

  const apiKey = process.env.REACT_APP_VWORLD_API_KEY;

  // console.log('들어온 lat, lng: ', lat, lng);
  return new Promise((resolve, reject) => {
    const url = `${URI}?request=GetFeature&key=${apiKey}&data=LT_P_MGPRTFA&geomFilter=POINT(${lng} ${lat})&service=data&domain=anjeonhaeyou.site&size=100&buffer=1000`;

    jsonp(url, undefined, (err: any, data: any) => {
      if (err) {
        console.error('안전이집 정보 불러오기 오류:', err);
        reject(err);
      } else {
        // console.log('안전이집: ', data);
        resolve(data);
      }
    });
  });
};

export default getSafehouses;
