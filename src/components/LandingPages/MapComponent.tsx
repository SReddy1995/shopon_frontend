// google maps integration


import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const center = {
  lat: -3.745,
  lng: -74.35
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(center);
  const [markerLocation, setMarkerLocation] = useState(center);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
  
  const mapRef = useRef(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setMarkerLocation({ lat: latitude, lng: longitude });
      },
      () => null
    );
  }, []);

  const setUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setMarkerLocation({ lat: latitude, lng: longitude });
      },
      () => null
    );
  }
  
  const onLoad = (map: any) => {
    mapRef.current = map; // Store the map reference
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setMarkerLocation(location);
      }
    }
  };

  const onAutocompleteLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  return (
    <div className="container mt-4">
        <div className="row">
            <div className="col-10">
            <LoadScript googleMapsApiKey={googleApiKey} libraries={["places"]}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={currentLocation}
                zoom={10}
                options={options}
                onLoad={onLoad}
              >
                <Marker position={markerLocation} />
                <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
                <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
                  <input
                    type="text"
                    placeholder="Search by city name or pincode"
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `240px`,
                      height: `32px`,
                      paddingLeft: `12px`,
                      marginTop: `10px`,
                      outline: `none`,
                      fontSize: `14px`,
                    }}
                  />
                </Autocomplete>
                </div>
              </GoogleMap>
    </LoadScript>
            </div>
        </div>
    </div>
    
  );
};

export default MapComponent;

