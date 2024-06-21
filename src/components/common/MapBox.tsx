import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';

import {
  latlongDeclarationAtom,
  isDeclarationAtom,
} from '../../store/declaration/Declarationstore';

/* eslint-disable */
declare global {
  interface Window {
    kakao: any;
  }
}

const MapBox = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [, setLatLon] = useAtom(latlongDeclarationAtom);
  const [, setIsDeclaration] = useAtom(isDeclarationAtom);

  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    var map = new window.kakao.maps.Map(container, options);

    var imageSrc = require("../../assets/images/main/declarationMarker.png");
    var imageSize = new window.kakao.maps.Size(30, 30);
    var imageOption = { offset: new window.kakao.maps.Point(15, 13) };
    var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    var marker = new window.kakao.maps.Marker({
      position: map.getCenter(),
      image: markerImage 
    });

    window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
      var latlng = mouseEvent.latLng;
      setLatLon({ latitude: latlng.getLat(), longitude: latlng.getLng() });
      setIsDeclaration(false);
      marker.setPosition(latlng);
      marker.setMap(map);
    });
  }, []);

  return <div id="map" style={{ width: '100%', height: '100%', borderRadius: '3% 3%  0 0' }} />;
};

export default MapBox;
