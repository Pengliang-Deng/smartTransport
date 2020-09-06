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
import BtmNav from './BtmNav'


Geocode.setApiKey("AIzaSyAiCd2qTJUFQq5lI5B9T3Intx_aAcDieIM")

const styles = {
    marginT: {marginTop: 2, marginBottom: 8}
}


export default class Tracker extends React.Component {

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

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >
                <AutoComplete
                            style={{
                                width: '96%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '10px',
                                marginBottom: '2rem'
                            }}
                            onPlaceSelected={this.onPlaceSelected}
                            types={['(regions)']}
                 />
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
                <Grid item style={styles.marginT} >
                    {/* <PixelTypography text='Smart Transport' variant='h4' /> */}
                    <Typography variant='h4'>Smart Transport</Typography>
                </Grid>
                <Grid item style={styles.marginT}>
                    {/* <PixelTypography text={`City: `+ this.state.city} variant='h7' /> */}
                    <Typography variant='h7'>{`City: `+ this.state.city}</Typography>
                </Grid>
                <Grid item style={styles.marginT} >
                    {/* <PixelTypography text={`Area: `+ this.state.area} variant='h7' /> */}
                    <Typography variant='h7'>{`Area: `+ this.state.area}</Typography>
                </Grid>
                <Grid item style={styles.marginT} >
                    {/* <PixelTypography text={`State: `+ this.state.state} variant='h7' /> */}
                    <Typography variant='h7'>{`State: `+ this.state.state}</Typography>
                </Grid>
                <Grid item style={styles.marginT} >
                    {/* <PixelTypography text={`Address: `+ this.state.address} variant ='h7' /> */}
                    <Typography variant='h7'>{`Address: `+ this.state.address}</Typography>
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

            <BtmNav />
        </div>
        
    );
  }
}


