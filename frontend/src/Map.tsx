import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

let googleMapsScriptLoaded = false;

const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (googleMapsScriptLoaded) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      googleMapsScriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject('Google Maps の読み込みに失敗しました');
    document.head.appendChild(script);
  });
};

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const address = queryParams.get('address');

  useEffect(() => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    console.log("APIキー:", apiKey);

    if (!apiKey || !address) {
      setError('APIキーまたは住所が指定されていません');
      return;
    }

    loadGoogleMapsScript(apiKey)
      .then(() => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const map = new window.google.maps.Map(mapRef.current as HTMLDivElement, {
                center: results[0].geometry.location,
                zoom: 13,
              });
          
              new window.google.maps.Marker({
                map,
                position: results[0].geometry.location,
              });
            } else {
              if (mapRef.current) {
                mapRef.current.innerHTML = '該当する場所が見つかりませんでした。';
                mapRef.current.style.height = '20px';
              }
            }
          });geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const map = new window.google.maps.Map(mapRef.current as HTMLDivElement, {
                center: results[0].geometry.location,
                zoom: 13,
              });
          
              new window.google.maps.Marker({
                map,
                position: results[0].geometry.location,
              });
            } else {
              if (mapRef.current) {
                mapRef.current.innerHTML = '該当する場所が見つかりませんでした。';
                mapRef.current.style.height = '20px';
              }
            }
          });
      })
      .catch((err) => setError(String(err)));
  }, [address]);

  return (
    <div>
      <h2>地図表示</h2>
      {error ? <p>{error}</p> : <div id="map" ref={mapRef} style={{ width: '100%', height: '400px' }} />}
    </div>
  );
};

export default Map;
