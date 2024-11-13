import React, { useState } from "react";

const ImageWithFallback = ({ src, alt }: any) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [fallbackSrc, setFallbackSrc] = useState("https://cdn.shopify.com/s/files/1/0567/3084/5242/files/logo41_b107e4e7-e866-401e-a025-d3ab4bcd7efd_40x40@3x.png?v=1728297340")
  
    const handleError = () => {
      setImgSrc(fallbackSrc); // Set the fallback image on error
    };
  
    return (
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError} // Trigger handleError if the image fails to load
      />
    );
  };

export default ImageWithFallback;