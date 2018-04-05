import React from "react";
import { compose, withProps, withHandlers } from "recompose";
import { Link } from 'react-router-dom';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
const imageStyles = {
    width: '50px',
    height: '50px'
}
const randomLat = (index) => (48.81238965 + 0.1 * index *
    Math.sin(30 * Math.PI * index / 180) *
    Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180));


const randomLon = (index) => (31.91318387 +
    0.01 * index *
    Math.cos(70 + 23 * Math.PI * index / 180) *
    Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180));


const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDjHo8xThOAcIZhNP-6COLfJ2rEXXqvIvY&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `60em` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withHandlers({

        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()

        },

    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={4}
        defaultCenter={{ lat: 48.81238965, lng: 31.91318387 }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map((marker, index) => {
                console.log(marker.username);
                return (
                    <Marker
                        key={marker.id}
                        position={{
                            lat: marker.lat == null ||
                                marker.lat === 'herher' || marker.lat == 1 ? randomLat(index) : parseInt(marker.lat), lng: marker.lon == null ||
                                    marker.lon === 'ertherh' ? randomLon(index) : parseInt(marker.lon)
                        }}>


                        <InfoWindow
                            options={{ disableAutoPan: true }}
                            key={`${marker.id}_info`}
                        ><div>
                                <Link to={{
                                    pathname: `/profile/${marker.id}/`,
                                    state: { user: marker, myProfileUser: props.myProfileUser }
                                }}>
                                    <img src={marker.image.data ? marker.image.data.url : marker.image} style={imageStyles} alt='face' />
                                </Link>
                                <div>{marker.username}</div>
                            </div>
                        </InfoWindow>

                    </Marker>
                )
            })}
        </MarkerClusterer>
    </GoogleMap>
);

class Map extends React.PureComponent {

    render() {

        return (

            <MapWithAMarkerClusterer
                markers={this.props.filteredPersonsForMap}
                fbProfileId={this.props.fbProfileId}
                myProfileUser={this.props.myProfileUser}
            />
        )
    }
}



export default Map;

