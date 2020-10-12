import React, { Component } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, 
    DirectionsService, DirectionsRenderer, 
    DistanceMatrixService } from '@react-google-maps/api';
import Geocode from "react-geocode";
//import { render } from '@testing-library/react';

Geocode.setApiKey("AIzaSyAiCd2qTJUFQq5lI5B9T3Intx_aAcDieIM")

const containerStyle = {
  width: '500px',
  height: '700px'
};

class Tracker extends Component {
    constructor (props) {
        super(props)
        this.autocomplete = null
        this.onLoad = this.onLoad.bind(this)
        this.onPlaceChanged = this.onPlaceChanged.bind(this)
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            zoom: 15,
            height: 200,
            mapPosition: {
                lat: 0,
                lng: 0,
            },
            markerPosition: {
                lat: 0,
                lng: 0,
            },
            response: null,
            travelMode: 'WALKING',
            origin: '',
            destination: ''
        }
        this.directionsCallback = this.directionsCallback.bind(this)
        this.checkDriving = this.checkDriving.bind(this)
        this.checkBicycling = this.checkBicycling.bind(this)
        this.checkTransit = this.checkTransit.bind(this)
        this.checkWalking = this.checkWalking.bind(this)
        this.getOrigin = this.getOrigin.bind(this)
        this.getDestination = this.getDestination.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onMapClick = this.onMapClick.bind(this)
    }

    directionsCallback (response) {
        console.log(response)

        if (response !== null) {
            if (response.status === 'OK') {
                this.setState(
                    () => ({
                    response
                    })
                )
            } else {
                console.log('response: ', response)
            }
        }
    }

    checkDriving ({ target: { checked } }) {
        checked && 
            this.setState(
                () => ({
                    travelMode: 'DRIVING'
                })
            )
    }

    checkBicycling ({ target: { checked } }) {
        checked && 
            this.setState(
                () => ({
                    travelMode: 'BICYCLING'
                })
            )
    }

    checkTransit ({ target: { checked } }) {
        checked && 
            this.setState(
                () => ({
                    travelMode: 'TRANSIT'
                })
            )
    }

    checkWalking ({ target: { checked } }) {
        checked && 
            this.setState(
                () => ({
                    travelMode: 'WALKING'
                })
            )
    }

    getOrigin (ref) {
        this.origin = ref
    }
    
    getDestination (ref) {
        this.destination = ref
    }

    onClick () {
        if (this.origin.value !== '' && this.destination.value !== '') {
            this.setState(
                () => ({
                    origin: this.origin.value,
                    destination: this.destination.value
                })
            )
        }
    }

    onMapClick (...args) {
        console.log('onClick args: ', args)
    }


    

    componentDidMount() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
            mapPosition: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            },
            markerPosition: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
            },
            () => {
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                response => {
                    console.log(response)
                    const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                    console.log('city', city, area, state);
                    this.setState({
                        address: (address) ? address : '',
                        area: (area) ? area : '',
                        city: (city) ? city : '',
                        state: (state) ? state : '',
                                })
                            },
                            error => {
                                console.error(error);
                            }
                        );

                    })
            });
        } 
    };

    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i<addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    }

    getArea = (addressArray) => {
        let area = '';
        for (let index = 0; index < addressArray.length; index++) {
            if (addressArray[index].types[0]) {
                for (let j = 0; j < addressArray[index].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[index].types[j] || 'locality' === addressArray[index].types[j]) {
                        area = addressArray[index].long_name;
                        return area;
                    }
                }
            }
        }
    }

    getState = (addressArray) => {
        let state = '';
        for (let index = 0; index < addressArray.length; index++) {
            for (let index = 0; index < addressArray.length; index++) {
                if (addressArray[index].types[0] && 'administrative_area_level_1' === addressArray[index].types[0]) {
                    state = addressArray[index].long_name;
                    return state;
                }
            }
        }
    }




    //TODO
    onLoad (autocomplete) {
        console.log('autocomplete: ', autocomplete)

        this.autocomplete = autocomplete
    }
    //TODO
    onPlaceChanged () {
        if (this.autocomplete !== null) {
        console.log(this.autocomplete.getPlace())
        } else {
        console.log('Autocomplete is not loaded yet!')
        }
    }

    render () {
    return (
        <div className = 'map'>
            <div className='map-settings'>
                <hr className='mt-0 mb-3' />

                <div className='row'>
                    <div className='col-md-6 col-lg-4'>
                        <div className='form-group'>
                            <label htmlFor='ORIGIN'>Origin</label>
                            <br />
                            <input id='ORIGIN' className='form-control' type='text' ref={this.getOrigin} />
                        </div>
                    </div>

                    <div className='col-md-6 col-lg-4'>
                        <div className='form-group'>
                            <label htmlFor='DESTINATION'>Destination</label>
                            <br />
                            <input id='DESTINATION' className='form-control' type='text' ref={this.getDestination} />
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-wrap'>
                    <div className='form-group custom-control custom-radio mr-4'>
                        <input
                            id='DRIVING'
                            className='custom-control-input'
                            name='travelMode'
                            type='radio'
                            checked={this.state.travelMode === 'DRIVING'}
                            onChange={this.checkDriving}
                        />
                        <label className='custom-control-label' htmlFor='DRIVING'>Driving</label>
                    </div>

                    <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='BICYCLING'
                        className='custom-control-input'
                        name='travelMode'
                        type='radio'
                        checked={this.state.travelMode === 'BICYCLING'}
                        onChange={this.checkBicycling}
                    />
                    <label className='custom-control-label' htmlFor='BICYCLING'>Bicycling</label>
                    </div>

                    <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='TRANSIT'
                        className='custom-control-input'
                        name='travelMode'
                        type='radio'
                        checked={this.state.travelMode === 'TRANSIT'}
                        onChange={this.checkTransit}
                    />
                    <label className='custom-control-label' htmlFor='TRANSIT'>Transit</label>
                    </div>

                    <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='WALKING'
                        className='custom-control-input'
                        name='travelMode'
                        type='radio'
                        checked={this.state.travelMode === 'WALKING'}
                        onChange={this.checkWalking}
                    />
                    <label className='custom-control-label' htmlFor='WALKING'>Walking</label>
                    </div>
                </div>

                <button className='btn btn-primary' type='button' onClick={this.onClick}>
                    Build Route
                </button>
            </div>
            <div className = 'map-container'>
                <LoadScript
                    googleMapsApiKey="AIzaSyAiCd2qTJUFQq5lI5B9T3Intx_aAcDieIM"
                    libraries = {['places']}
                >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
                    zoom={15}
                >
                {
                    (
                        this.state.destination !== '' &&
                        this.state.origin !== ''
                    ) && (
                        <DirectionsService
                            options={{ 
                                
                                destination: this.state.destination,
                                origin: this.state.origin,
                                travelMode: this.state.travelMode
                            }}
                            callback={this.directionsCallback}
                        />
                    )
                    }

                    {
                    this.state.response !== null && (
                        <DirectionsRenderer
                            options={{ 
                                
                                directions: this.state.response
                            }}
                        />
                    )
                    }
                    <Autocomplete
                    onLoad={this.onLoad}
                    onPlaceChanged={this.onPlaceChanged}
                    >
                    <input
                        type="text"
                        placeholder="Seach Address"
                        style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "fixed",
                        left: "50%",
                        marginLeft: "-120px"
                        }}
                    />
                    </Autocomplete>
                    <Marker
                        draggable = {true}
                        position = {{lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
                    />
                </GoogleMap>
                </LoadScript>
            </div>  
        </div>
        
    )
    }

}

export default React.memo(Tracker);


