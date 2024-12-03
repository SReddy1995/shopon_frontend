// google maps integration


import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete, InfoWindow  } from '@react-google-maps/api';
import { showWarningMessage } from '../../shared/notificationProvider';
import { NO_POSTAL_CODE_LOCATION } from '../../utils/constants/NotificationConstants';

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

const MapComponent = (props: any) => {
  const [currentLocation, setCurrentLocation] = useState(center);
  const [markerLocation, setMarkerLocation] = useState(center);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;
  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  
  const mapRef = useRef(null);
  const [showLocateLocationOnMap, setShowLocateLocationOnMap] = useState(false)
  const autocompleteRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState('');

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setMarkerLocation({ lat: latitude, lng: longitude });
          getGeoCoder(latitude, longitude)
          
        },
        (err) => {
          console.log('Geolocation error: ' + err.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const getGeoCoder = (latitude: any, longitude: any) =>{
              // Initialize Google Maps Geocoder service
              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                  if(results[0].address_components){
                    if(results[0].address_components.filter((x: any)=> x.types.includes("postal_code")).length>0){
                      let res = getAddressFormatted(results[0].address_components, latitude, longitude, results[0].formatted_address )
                      if(showLocateLocationOnMap){
                        setTimeout(()=>{
                          setSelectedAddress(res)
                        },0)
                      }
                      else{
                        setSelectedAddress(null)
                          setTimeout(()=>{
                            props.setLocation(res)
                          },0)
                      }
                    }
                    else{
                      showWarningMessage(NO_POSTAL_CODE_LOCATION)
                    }
    
                   
                } else {
                  console.log('Address not found');
                }
              }
              }
            );
  }

  const getAddressFormatted = (values: any, lat: any, lng: any, formatted_address: any) => {
    let addr : any;
    let arr: any= []
    if(Array.isArray(values) && values.filter((x:any)=>x.types.includes('locality')).length>0 &&  values.filter((x:any)=>x.types.includes('locality'))[0].long_name){
      addr = values.filter((x:any)=>x.types.includes('locality'))[0].long_name;
    }
    if(Array.isArray(values) && values.filter((x:any)=>x.types.includes('postal_code')).length>0 && values.filter((x:any)=>x.types.includes('postal_code'))[0].long_name){
      addr = addr + ', '+values.filter((x:any)=>x.types.includes('postal_code'))[0].long_name;
    }

    let gps_coordinates = {latitude: lat, longitude: lng}
    arr.push({address: addr, location: gps_coordinates, formatted_address:formatted_address })
    return arr
    
  }
  
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
  
  const onLoad = (map: any) => {
    mapRef.current = map; // Store the map reference
    // getCurrentLocation();
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if(place.address_components){

        if(place.address_components.filter((x: any)=> x.types.includes("postal_code")).length>0){
          let lat: any,lng: any;
          if (place.geometry && place.geometry.location) {
              lat= place.geometry.location.lat();
              lng= place.geometry.location.lng()
          }
          else{
            lat= null;
            lng= null
          }
          setMarkerLocation({lat:lat,lng:lng})
          setCurrentLocation({lat:lat,lng:lng});
          let res = getAddressFormatted(place.address_components, lat, lng, place.formatted_address)
          
          if(showLocateLocationOnMap){
              setTimeout(()=>{
                setSelectedAddress(res)
              },0)
          }
          else{
            setSelectedAddress(null)
              setTimeout(()=>{
                props.setLocation(res)
              },0)
          }
        }
        else{
          showWarningMessage(NO_POSTAL_CODE_LOCATION)
        }
    }

    }
  };

  const onAutocompleteLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const closeModal = () => {
    props.closeModal();
  }

  const handleMapClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setCurrentLocation({ lat: lat, lng: lng });
    setMarkerLocation({ lat: lat, lng: lng });
    getGeoCoder(lat, lng)
  };

  const handleLocateLocationOnMap = () => {
    setSelectedAddress(null)
    setShowLocateLocationOnMap(true)
  }

  const confirmSelectedLocation = () => {
    props.setLocation(selectedAddress)
  }

  const navigateTopreviousList = () => {
    setSelectedAddress(null)
    setShowLocateLocationOnMap(false)
  }



  return (
<>
<LoadScript googleMapsApiKey={googleApiKey} libraries={["places"]}>
    <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-left d-flex flex-row">
            {
              showLocateLocationOnMap ?
              <>
                              <div  className='back-button-container cursor-pointer mt-2'>
                                <i className='fa fa-arrow-left' onClick={navigateTopreviousList}></i>
                                <h6 className='pl-2 mb-0'>Back</h6>
                            </div>
              </>
              :
              <h4>Select a location</h4>
            }
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
              <input ref={autocompleteRef} className="location-search_input" type="text" name="" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}  placeholder="Search by city name or pincode" />
              </Autocomplete>
              
            </div>
          </div>
          {
            !showLocateLocationOnMap && 
              <>
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
                <p className='location-text mb-0' onClick={handleLocateLocationOnMap}>Locate on map </p>
                </div>
              </div>
            </div>
          </div>
                  </>
          }
          
          {
            showLocateLocationOnMap &&
            <>
             <div className="dropdown-divider"></div>
            <div className="col-12 mt-2">
                         
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
                        <h6>Selected Location</h6>
                        <p>{selectedAddress[0].formatted_address}</p>
                      </div>
                    </InfoWindow>
                  )}

                  </Marker>
                                  <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
                  </div>

            </GoogleMap>
            <div className="dropdown-divider"></div>
            {
              selectedAddress && 
              <div className="container mt-2">
              <div className="row mt-2">
                <div className="col-7 text-left">
                  <h6>Selected location:</h6>
                  <p>{selectedAddress[0].formatted_address}</p>
                </div>
                <div className="col-5">
                  <button className='btn btn-success btn-sm' onClick={confirmSelectedLocation}>Confirm selected location</button>
                </div>
              </div>
            </div>
            }

          </div>
          </>
          }



        </div>
    </div>
    </LoadScript>
    </>
  );
};

export default MapComponent;

