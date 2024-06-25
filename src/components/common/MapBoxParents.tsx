import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import profile1 from '@assets/images/profile/profile1.svg';
import profile2 from '@assets/images/profile/profile2.svg';
import profile3 from '@assets/images/profile/profile3.svg';
import profile4 from '@assets/images/profile/profile4.svg';
import profile5 from '@assets/images/profile/profile5.svg';
import profile6 from '@assets/images/profile/profile6.svg';
import childrenLocationAtom from '../../store/children/ChildrenLocation';

/* eslint-disable */
declare global {
  interface Window {
    kakao: any;
  }
}

const MapBoxParent = () => {
  const [childrenLocation] = useAtom(childrenLocationAtom);

  const mapRef = useRef<any>(null);
  const ChildrenLocationMarkerRef = useRef<any>(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    const childrenLocationMarker = new window.kakao.maps.Marker({});
    ChildrenLocationMarkerRef.current = childrenLocationMarker;
  }, []);


  useEffect(() => {
    const map = mapRef.current;
    const marker = ChildrenLocationMarkerRef.current;
    var lat = childrenLocation.latitude;
    var lon = childrenLocation.longitude;
    var img = childrenLocation.img;

    // Mapping image values to profile images
    const profileImages: { [key: number]: string } = {
      1: profile1,
      2: profile2,
      3: profile3,
      4: profile4,
      5: profile5,
      6: profile6,
    };
    let numLat = parseInt(lat, 10);
    let numLon = parseInt(lon,10);
  

    if (numLat !== 0 && numLon !== 0) {
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

export default MapBoxParent;
