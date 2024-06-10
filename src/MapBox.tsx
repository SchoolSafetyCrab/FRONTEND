import React, { useEffect, useState } from 'react';

/* eslint-disable */
declare global {
  interface Window {
    kakao: any;
  }
}

const MapBox = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Kakao Maps API가 로드될 때까지 기다립니다.
    if (window.kakao && window.kakao.maps) {
      // Kakao Maps API가 로드된 후 실행될 로직을 작성합니다.
      let container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스

      // MULTIPOLYGON 데이터
      var multipolygonData = [
        [
          [234498.709205539, 416861.755269708],
          [234585.451020205, 416860.889902022],
          [234585.689866971, 416851.810856702],
          [234498.749315809, 416851.666545248],
          [234498.709205539, 416861.755269708],
        ],
      ];

      // MULTIPOLYGON 데이터를 변환하여 경위도 형식으로 저장
      var path = multipolygonData[0].map(function (coords) {
        return new window.kakao.maps.LatLng(coords[1], coords[0]); // 경위도 순서로 좌표 생성
      });

      // 다각형의 중심 좌표 계산
      var sumLat = 0;
      var sumLng = 0;
      path.forEach((coord) => {
        sumLat += coord.getLat();
        sumLng += coord.getLng();
      });
      const avgLat = sumLat / path.length;
      const avgLng = sumLng / path.length;

      // 다각형을 지도에 표시
      var polygon = new window.kakao.maps.Polygon({
        path: path, // 다각형의 경로 설정
        strokeWeight: 2, // 선의 두께 설정
        strokeColor: '#ff0000', // 선 색상 설정
        strokeOpacity: 0.8, // 선 투명도 설정
        fillColor: '#ff0000', // 채우기 색상 설정
        fillOpacity: 0.3, // 채우기 투명도 설정
      });

      // 다각형을 지도에 추가
      polygon.setMap(
        new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(avgLat, avgLng), // 다각형 중심 좌표를 지도의 중심으로 설정
          level: 3, // 지도의 레벨(확대, 축소 정도)
        }),
      );

      // 지도의 중심 좌표 저장
      setCenter({ lat: avgLat, lng: avgLng });
    }
  }, []);

  return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default MapBox;
