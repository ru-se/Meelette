import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShopResult: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const address = queryParams.get("address"); // URLパラメータから住所を取得

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    if (!address) {
      console.error("住所が指定されていません");
      return;
    }

    const fetchCoordinates = async () => {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const encodedAddress = encodeURIComponent(address);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setLat(location.lat);
          setLng(location.lng);
        } else {
          console.error("Geocoding APIエラー:", data.status, data.error_message);
        }
      } catch (error) {
        console.error("APIリクエストエラー:", error);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <div>
      <h2>地図表示</h2>
      <p>住所: {address}</p>
      {lat !== null && lng !== null ? (
        <iframe
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}`}
        ></iframe>
      ) : (
        <p>地図を読み込んでいます...</p>
      )}
    </div>
  );
};

export default ShopResult;
