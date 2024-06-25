import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import profile1 from '@assets/images/profile/profile1.svg';
import profile2 from '@assets/images/profile/profile2.svg';
import profile3 from '@assets/images/profile/profile3.svg';
import profile4 from '@assets/images/profile/profile4.svg';
import profile5 from '@assets/images/profile/profile5.svg';
import profile6 from '@assets/images/profile/profile6.svg';
import {
  latlongDeclarationAtom,
  isDeclarationAtom,
  isActiveDeclarationBtnAtom,
} from '../../store/declaration/Declarationstore';

import pointAtom from '../../store/home/point/Pointsotre';
import childrenLocationAtom from '../../store/children/ChildrenLocation';

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
  const [childrenLocation] = useAtom(childrenLocationAtom);

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const myLocationMarkerRef = useRef<any>(null);
  const ChildrenLocationMarkerRef = useRef<any>(null);
  const clickListenerRef = useRef<any>(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
        console.log(lat);
        var locPosition = new window.kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
      });
    }

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

    const childrenLocationMarker = new window.kakao.maps.Marker({});
    ChildrenLocationMarkerRef.current = childrenLocationMarker;
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
    } else {
      marker.setMap(null);
    }
  }, [point]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = ChildrenLocationMarkerRef.current;
    var lat = childrenLocation.latitude;
    var lon = childrenLocation.longitude;
    var img = childrenLocation.img;
    console.log(lat);

    // Mapping image values to profile images
    const profileImages: { [key: number]: string } = {
      1: profile1,
      2: profile2,
      3: profile3,
      4: profile4,
      5: profile5,
      6: profile6,
    };

    if (lat !== '0' && lon !== '0') {
      var locPosition = new window.kakao.maps.LatLng(lat, lon);
      map.setCenter(locPosition);
      // Create marker image based on img value
      const imgIndex = parseInt(img, 10);
      const imageSrc = profileImages[imgIndex] || profile1; // Default to profile1 if img is not 1-6
      const imageSize = new window.kakao.maps.Size(30, 30);
      const imageOption = { offset: new window.kakao.maps.Point(15, 13) };
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      marker.setImage(markerImage);
      marker.setPosition(locPosition);
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  }, [childrenLocation]);

  return <div id="map" style={{ width: '100%', height: '100%', borderRadius: '3% 3%  0 0' }} />;
};

export default MapBox;
