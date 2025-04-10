import React from 'react';

type Props = {
  address: string;
};

const GoogleMapEmbed: React.FC<Props> = ({ address }) => {
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(address)}`;

  return (
    <iframe
      width="100%"
      height="300"
      frameBorder="0"
      style={{ border: 0 }}
      src={mapSrc}
      allowFullScreen
      loading="lazy"
    ></iframe>
  );
};

export default GoogleMapEmbed;