import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    InfoWindow,
    Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
// import { Descriptions, Input } from 'antd';
// import PixelTypography from './PixelTypography';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import AutoComplete from "react-google-autocomplete";
import PixelTypography from './PixelTypography';
import Button from '@material-ui/core/Button';
import http from '../util/axios_packaged';



Geocode.setApiKey("AIzaSyAiCd2qTJUFQq5lI5B9T3Intx_aAcDieIM")

const styles = {
    marginT: {marginTop: 1, marginBottom: 4},
    margin:{
        marginTop: 1,
        marginBottom: 16
    },
    button2: {
        marginTop: '2px',
        backgroundColor: '#43341B',
        // position: 'relative',
        // left: '50%',
        // transform: 'translateX(-50%)',
    },
}


export default class Tracker extends React.Component {
    constructor(props) {
        super(props);
        this.confirmLocation = this.confirmLocation.bind(this)
      }
    

    state = {
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
        locationWatcher: null, // the id of location watcher
        hasConfirmedStartPosition: false
    }

    componentDidMount() {
        if (navigator.geolocation) {
            const watcherId = navigator.geolocation.watchPosition(position => {
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
            this.setState({locationWatcher: watcherId}) // record watcher id
        } 

        http.get('/gameData/get/trackStatus').then((res) => {
            let trackStatus = res.data;
            this.setState({
                hasConfirmedStartPosition: trackStatus.hasConfirmed
            })
        })
    };

    componentWillUnmount() {
        if (this.state.locationWatcher) {
            navigator.geolocation.clearWatch(this.state.locationWatcher);
        }
    }

    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++){
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


    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();
        
        Geocode.fromLatLng(newLat, newLng)
         .then(response => {
            console.log('response', response) 
            const address = response.results[0].formatted_address,
                  addressArray = response.results[0].address_components,
                  city = this.getCity(addressArray),
                  area = this.getArea(addressArray),
                  state = this.getState(addressArray);
            this.setState({
                address: (address) ? address : "",
                city: (city) ? area : "",
                area: (area) ? area : "",
                state: (state) ? state: "",
                markerPosition : {
                    lat: newLat,
                    lng: newLng, 
                },
                mapPosition : {
                    lat: newLat,
                    lng: newLng, 
                },
            })
         })
         .catch(err => {
             console.log(err)
         })
    }

    onPlaceSelected = ( place ) => {
        // console.log(place)
        try {
            const address = place.formatted_address,
                addressArray = place.address_components,
                city = this.getCity( addressArray),
                area = this.getArea(addressArray),
                state = this.getState(addressArray),
                newLat = place.geometry.location.lat(),
                newLng = place.geometry.location.lng();


            this.setState({
                address: (address) ? address : "",
                city: (city) ? area : "",
                area: (area) ? area : "",
                state: (state) ? state: "",
                markerPosition : {
                    lat: newLat,
                    lng: newLng, 
                },
                mapPosition : {
                    lat: newLat,
                    lng: newLng, 
                },
                
            })
        } catch (err) {
            console.log(err)
        }
      
    }

    /**
     * a function to confirm start location and end location 
     */
    confirmLocation() {
        let trackStatus;
        http.get('/gameData/get/trackStatus')
        .then((res) => {
            trackStatus = res.data;
            console.log("0")

            if (this.state.hasConfirmedStartPosition) {
                // save end position's lat and lng
                http.post('/gameData/save/trackStatus', {attribute: 'endPoint', value: this.state.markerPosition})
                // change the state of hasConfirmedStartPosition
                this.setState({
                    hasConfirmedStartPosition: false,
                })
                http.post('/gameData/save/trackStatus', {attribute: 'hasConfirmed', value: this.hasConfirmedStartPosition})

                // change isTracking
                http.post('/gameData/save/trackStatus', {attribute: 'isTracking', value: false})
                
                let coins;
                http.get('/gameData/calculate').then((res) => {
                    coins = res.data
                })

                window.alert(`${coins} have been rewarded!`)
                window.location.reload()
                return 
                // console.log("1")
                
                
            }

            if (trackStatus.isTracking) {
                // save start position's lat and lng
                console.log(this.state.markerPosition);
                http.post('/gameData/save/trackStatus', {attribute: 'startPoint', value: this.state.markerPosition})
                // change the state of hasConfirmedStartPosition
                this.setState({
                    hasConfirmedStartPosition: true,
                })
                http.post('/gameData/save/trackStatus', {attribute: 'hasConfirmed', value: this.hasConfirmedStartPosition})
                // console.log("2")
                // window.location.reload()
                
            }

            
        })
 
    }

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >
                {/* <AutoComplete
                            style={{
                                width: '96%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '10px',
                                marginBottom: '2rem'
                            }}
                            onPlaceSelected={this.onPlaceSelected}
                            types={['(regions)']}
                 /> */}
                <Marker
                    //google={this.props.google}
                    draggable={true}
                    onDragEnd={this.onMarkerDragEnd}
                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                 >
                    <InfoWindow>
                        <div>
                            {this.state.address}
                        </div>
                    </InfoWindow>
                </Marker>
          </GoogleMap>
      ));
    return (

        <div style={{ padding: '1rem', margin: '0 auto', maxWidth: 700 }}>
            
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item style={styles.marginT}>
                    {
                        this.state.hasConfirmedStartPosition?
                        <PixelTypography fontStyle="textS2" variant='h4' text="JOURNEY ENDS AT" />
                        :
                        <PixelTypography fontStyle="textS2" variant='h4' text="JOURNEY STARTS AT" />
                    }
                </Grid>

                {/* <Grid item style={styles.marginT}>
                    <PixelTypography fontStyle="textS2" variant='h6' text={`City: `+ this.state.city} />
                </Grid>
                <Grid item style={styles.marginT} >
                    <PixelTypography fontStyle="textS2" variant='h6' text={`Area: `+ this.state.area} />
                </Grid>
                <Grid item style={styles.marginT} >
                    <PixelTypography fontStyle="textS2" variant='h6' text={`State: `+ this.state.state} />
                </Grid> */}
                <Grid item style={styles.marginT} >
                    <PixelTypography fontStyle="textS2" variant='h5' text={`Address: `+ this.state.address} />
                </Grid>
                <Grid item style={styles.margin}>
                    <Button onClick={this.confirmLocation} style={styles.button2} size='large' variant="contained" color="secondary" >
                        <PixelTypography fontStyle='textS2' variant='h5' text="CONFIRM LOCATION" />
                    </Button>
                </Grid>
            </Grid>

            {/* <Descriptions bordered size = 'small'>
                <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
                <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
                <Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>
                    {this.state.address}
                </Descriptions.Item>
            </Descriptions> */}
            
            {/* <Input placeholder="Search">
            </Input> */}

            <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiCd2qTJUFQq5lI5B9T3Intx_aAcDieIM&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
        
    );
  }
}
