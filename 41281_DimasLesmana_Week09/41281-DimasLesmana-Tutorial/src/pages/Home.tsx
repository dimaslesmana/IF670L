import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { Geolocation } from '@capacitor/geolocation';

import './Home.css';

const Home: React.FC = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const umnPosition = { lat: -6.257377926995551, lng: 106.61829861017398 };

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if (e.latLng?.lat()) {
      setLat(e.latLng?.lat());
    }

    if (e.latLng?.lng()) {
      setLng(e.latLng?.lng());
    }
  };

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;

    console.log('Current position:', coordinates);
    console.log('Lat:', latitude);
    console.log('Lng:', longitude);

    setLat(latitude);
    setLng(longitude);
  };

  const trackPosition = async () => {
    const data = await Geolocation.watchPosition({ enableHighAccuracy: true, timeout: 1000 }, (position, err) => {
      if (position) {
        console.log(position);
      }
    });
  };

  const containerStyle = {
    width: '100%',
    height: '100%',
    color: '#000000',
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton onClick={getCurrentPosition}>Current Position</IonButton>
        <IonButton onClick={trackPosition}>Track Position</IonButton>

        <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: lat, lng: lng }}
            onClick={selectPos}
            zoom={14}>

            <Marker position={{ lat: lat, lng: lng }} />

            <InfoWindow position={umnPosition}>
              <div>
                <h1>Kampus paling keren.</h1>
              </div>
            </InfoWindow>

          </GoogleMap>
        </LoadScript>
      </IonContent>
    </IonPage>
  );
};

export default Home;
