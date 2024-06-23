import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import {
  latlongDeclarationAtom,
  isDeclarationAtom,
  isActiveDeclarationBtnAtom,
} from '../../store/declaration/Declarationstore';
import pointAtom from '../../store/home/point/Pointsotre';

/* eslint-disable */
declare global {
  interface Window {
    kakao: any;
  }
}

const MapBox = () => {
  const [, setLatLon] = useAtom(latlongDeclarationAtom);
  const [, setIsDeclaration] = useAtom(isDeclarationAtom);
  const [isActiveDeclarationBtn] = useAtom(isActiveDeclarationBtnAtom);
  const [point] = useAtom(pointAtom);

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const myLocationMarkerRef = useRef<any>(null);
  const clickListenerRef = useRef<any>(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    const imageSrc = require('../../assets/images/main/declarationMarker.png');
    const imageSize = new window.kakao.maps.Size(30, 30);
    const imageOption = { offset: new window.kakao.maps.Point(15, 13) };
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const marker = new window.kakao.maps.Marker({
      image: markerImage,
    });
    markerRef.current = marker;

    const myLocationMarker = new window.kakao.maps.Marker({});
    myLocationMarkerRef.current = myLocationMarker;
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;

    if (!isActiveDeclarationBtn) {
      console.log('false');
      const clickListener = (mouseEvent: any) => {
        const latlng = mouseEvent.latLng;
        setLatLon({ latitude: latlng.getLat(), longitude: latlng.getLng() });
        setIsDeclaration(false);
        marker.setPosition(latlng);
        marker.setMap(map);
      };

      // 클릭 이벤트 리스너 추가
      window.kakao.maps.event.addListener(map, 'click', clickListener);
      clickListenerRef.current = clickListener;

      // 마커를 지도에 추가
      marker.setMap(map);
    } else {
      // 클릭 이벤트 리스너 제거
      if (clickListenerRef.current) {
        window.kakao.maps.event.removeListener(map, 'click', clickListenerRef.current);
        clickListenerRef.current = null;
      }

      // 마커를 지도에서 제거
      if (marker) {
        marker.setMap(null);
      }
    }
  }, [isActiveDeclarationBtn, setLatLon, setIsDeclaration]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = myLocationMarkerRef.current;
    var lat = point.latitude;
    var lon = point.longitude;

    if (lat !== 0 && lon !== 0) {
      var locPosition = new window.kakao.maps.LatLng(lat, lon);
      marker.setPosition(locPosition);
      marker.setMap(map);
      map.setCenter(locPosition);  
    } else {
      marker.setMap(null);
    }
  }, [point]);

  return <div id="map" style={{ width: '100%', height: '100%', borderRadius: '3% 3%  0 0' }} />;
};

export default MapBox;
