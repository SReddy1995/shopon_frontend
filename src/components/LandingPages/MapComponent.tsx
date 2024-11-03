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

const MapComponent = (props: any) => {
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

  const closeModal = () => {
    props.closeModal();
  }

  return (
<>
    <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-left d-flex flex-row">
            <h4>Select a location</h4>
            <i className='fa fa-close fa-lg cursor-pointer mt-2' onClick={closeModal}></i>
          </div>
          <div className="col-12 mt-2">
            <div className="location-search-container">
              <button type="button" name="searchQuerySubmit">
                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                  <path fill="#666666"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
              </button>
              <input className="location-search_input" type="text" name="" placeholder="Select for your location" />
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="location-selection-option-container">
              <div className='d-flex flex-row gap-3 align-items-center cursor-pointer'>
                <div className='d-flex gap-1'>
                <i className="fas fa-location" style={{color: '#fb65a1', fontSize:'1.2rem'}}></i>
                <p className='location-text mb-0'>Use your current location</p>
                </div>
                <div className='d-flex gap-1 align-items-center'>
                  <p className='location-text mb-0'><span className='gray-indicator'>--</span></p>
                    <div className='rounded-or-box'>
                      <p className='text-sm mb-0 p-2'>OR</p>
                    </div>
                  <p className='location-text mb-0'><span className='gray-indicator'>--</span></p>
                </div>

                <div className='d-flex gap-1 cursor-pointer'>
                <i className="fas fa-location-dot" style={{color: '#fb65a1', fontSize:'1.2rem'}}></i>
                <p className='location-text mb-0'>Locate on map </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="row">
              <div className="col-4 recent-locations-title-tab-active">
                  <h6>Recent locations</h6>
              </div>
              <div className="col-8 recent-locations-title-tab-inactive">

              </div>
            </div>
          </div>
          <div className="col-12 recent-locations-list px-0">
            <div className='recent-locations-list-pill p-3'>
                  <i className="fas fa-location-dot" style={{color: '#fb65a1', fontSize:'1.2rem'}}></i>
                  <div className='d-flex flex-column text-left'>
                    <p className='font-weight-bold mb-0'>560064 </p>
                    <p className='mb-0'>560064, BANGALORE, Karnataka </p>
                  </div>
            </div>

            <div className='recent-locations-list-pill p-3'>
                  <i className="fas fa-location-dot" style={{color: '#fb65a1', fontSize:'1.2rem'}}></i>
                  <div className='d-flex flex-column text-left'>
                    <p className='font-weight-bold mb-0'>560064 </p>
                    <p className='mb-0'>560064, BANGALORE, Karnataka </p>
                  </div>
            </div>
            <div className='recent-locations-list-pill p-3'>
                  <i className="fas fa-location-dot" style={{color: '#fb65a1', fontSize:'1.2rem'}}></i>
                  <div className='d-flex flex-column text-left'>
                    <p className='font-weight-bold mb-0'>560064 </p>
                    <p className='mb-0'>560064, BANGALORE, Karnataka </p>
                  </div>
            </div>
            <div className='recent-locations-list-pill p-3'>
                  <i className="fas fa-location-dot" style={{color: '#fb65a1', fontSize:'1.2rem'}}></i>
                  <div className='d-flex flex-column text-left'>
                    <p className='font-weight-bold mb-0'>560064 </p>
                    <p className='mb-0'>560064, BANGALORE, Karnataka </p>
                  </div>
            </div>
            <div className='recent-locations-list-pill p-3'>
                  <i className="fas fa-location-dot" style={{color: '#fb65a1', fontSize:'1.2rem'}}></i>
                  <div className='d-flex flex-column text-left'>
                    <p className='font-weight-bold mb-0'>560064 </p>
                    <p className='mb-0'>560064, BANGALORE, Karnataka </p>
                  </div>
            </div>
            
          </div>
        </div>
    </div>
    {/* <div className="container mt-4">
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
    </div> */}
    </>
  );
};

export default MapComponent;

