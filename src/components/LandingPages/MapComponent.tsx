// google maps integration


import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete, InfoWindow  } from '@react-google-maps/api';
import { showWarningMessage } from '../../shared/notificationProvider';

const mapContainerStyle = {
  height: "300px",
  width: "100%"
};

const center = {
  lat: 0,
  lng: 0
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"]

const MapComponent = (props: any) => {
  const [currentLocation, setCurrentLocation] = useState(center);
  const [markerLocation, setMarkerLocation] = useState(center);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  
  const mapRef = useRef(null);
  const [map, setMap] = React.useState(null)

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setMarkerLocation({ lat: latitude, lng: longitude });
          // Initialize Google Maps Geocoder service
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            console.log(results)
            if (status === 'OK' && results && results[0]) {
              setSelectedAddress(results[0].formatted_address);
            } else {
              console.log('Address not found');
            }
          });

          // const latLng = new window.google.maps.LatLng(latitude, longitude);
          // try {
          //   const results = await geocoder.geocode({ location: latLng });
          //   console.log(results)
          //   if (results && results.results.length > 0) {
          //     setSelectedAddress(results.results[0].formatted_address);
          //   } else {
          //     console.log('No address found');
          //   }
          // } catch (error: any) {
          //   console.log('Geocoder failed: ' + error.message);
          // }
        },
        (err) => {
          console.log('Geolocation error: ' + err.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };
  
  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude, longitude } = position.coords;
    //     setCurrentLocation({ lat: latitude, lng: longitude });
    //     setMarkerLocation({ lat: latitude, lng: longitude });

    //   },
    //   () => null
    // );
    // getCurrentLocation()
  }, []);

  const reverseGeocode = (latLng: any) => {
    // Ensure the Google Maps API has fully loaded before creating the Geocoder
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        console.log(results)
        if (status === 'OK' && results && results[0]) {
          setSelectedAddress(results[0].formatted_address);
        } else {
          console.log('Address not found');
        }
      });
    } else {
      console.error('Google Maps API is not available');
    }
  };

  const setUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setMarkerLocation({ lat: latitude, lng: longitude });
        reverseGeocode({ lat: latitude, lng: longitude })
      },
      () => null
    );
  }
  
  const onLoad = (map: any) => {
    mapRef.current = map; // Store the map reference
    // getCurrentLocation();
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setSelectedAddress(place.formatted_address)
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setMarkerLocation(location)
        setCurrentLocation(location);
      }

    }
  };

  const onAutocompleteLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const closeModal = () => {
    props.closeModal();
  }

  const handleMarkerDragEnd = (e: any) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkerLocation(newPosition);
  };

  const handleMapClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setCurrentLocation({ lat: lat, lng: lng });
    setMarkerLocation({ lat: lat, lng: lng });
    reverseGeocode({ lat: lat, lng: lng })
  };



  return (
<>
<LoadScript googleMapsApiKey={googleApiKey} libraries={["places"]}>
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
              <Autocomplete className='w-100' onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}
                      options={{
                        componentRestrictions: { country: 'IN' }, // Restrict to India
                      }}>
              <input className="location-search_input" type="text" name="" placeholder="Search by city name or pincode" />
              </Autocomplete>
              
            </div>
            <div className="col-12">
            {
              selectedAddress &&

              <p>Selected address -- {selectedAddress}</p>
            }
            </div>
          </div>
          <div className="col-12 mt-2">
            <div className="location-selection-option-container">
              <div className='d-flex flex-row gap-3 align-items-center cursor-pointer'>
                <div className='d-flex gap-1'>
                <i className="fas fa-location" style={{color: '#fb65a1', fontSize:'1.2rem'}}></i>
                <p className='location-text mb-0' onClick={getCurrentLocation}>Use your current location</p>
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
          {/* <div className="col-12 mt-2">
            <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={currentLocation}
                  zoom={10}
                  options={options}
                  onLoad={onLoad}
                  onClick={handleMapClick}
                >
                  <Marker position={markerLocation}
                  draggable={true} >
                  {selectedAddress && (
                    <InfoWindow position={markerLocation}>
                      <div>
                        <h3>Selected Location</h3>
                        <p>{selectedAddress}</p>
                      </div>
                    </InfoWindow>
                  )}

                  </Marker>
                                  <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
                  </div>

            </GoogleMap>
          </div> */}
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
    </LoadScript>
     {/* <div className="container mt-4">
        <div className="row">
            <div className="col-10">
            <LoadScript googleMapsApiKey={"AIzaSyBRJcUmvzO1o9xd4h6Vw2u0In6HBHPOBd0"} libraries={["places"]}>
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
    </div>  */}
    </>
  );
};

export default MapComponent;

