import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { base64FromPath } from '@capacitor-community/filesystem-react';
import { Geolocation } from '@capacitor/geolocation';

import MemoriesContext from '../data/memories-context';

import './NewMemory.css';

const NewMemory: React.FC = () => {
  const umnLocation = { lat: -6.257377926995551, lng: 106.61829861017398 };

  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined;
    preview: string;
  }>();
  const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>('good');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number }>(umnLocation);
  const titleRef = useRef<HTMLIonInputElement>(null);
  const memoriesCtx = useContext(MemoriesContext);
  const history = useHistory();

  useEffect(() => {
    const getCurrentPosition = async () => {
      const { coords: { latitude: lat, longitude: lng } } = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });

      setSelectedLocation({ lat: lat, lng: lng });
    };

    getCurrentPosition();
  }, []);

  const selectMemoryTypeHandler = (event: CustomEvent) => {
    const selectedMemoryType = event.detail.value;

    setChosenMemoryType(selectedMemoryType);
  };

  const takePhotoHandler = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 500,
      });

      if (!photo || !photo.webPath) {
        return;
      }

      setTakenPhoto({
        path: photo.path,
        preview: photo.webPath,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addMemoryHandler = async () => {
    const enteredTitle = titleRef.current?.value;

    if (!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !chosenMemoryType) {
      return;
    }

    const fileName = new Date().getTime() + '.jpeg';
    const base64 = await base64FromPath(takenPhoto!.preview);

    memoriesCtx.addMemory(enteredTitle.toString(), chosenMemoryType, selectedLocation, fileName, base64);

    history.length > 0 ? history.goBack() : history.replace('/tabs/good-memories');
  };

  const selectPos = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (!lat || !lng) {
      return;
    }

    setSelectedLocation({ lat, lng });
  };

  const mapContainerStyle = {
    width: '100%',
    height: '50vh',
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Add New Memory</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Memory Title</IonLabel>
                <IonInput type="text" ref={titleRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Memory Type</IonLabel>
                <IonSelect value={chosenMemoryType} onIonChange={selectMemoryTypeHandler}>
                  <IonSelectOption value="good">Good Memory</IonSelectOption>
                  <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <div className="image-preview">
                {takenPhoto ? (
                  <img src={takenPhoto.preview} alt="Preview" />
                ) : (
                  <h3>No photo chosen.</h3>
                )}
              </div>
              <IonButton fill="clear" onClick={takePhotoHandler}>
                <IonIcon slot="start" icon={camera} />
                <IonLabel>Take Photo</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={selectedLocation}
                  onClick={selectPos}
                  zoom={14}>

                  <Marker position={selectedLocation} />
                </GoogleMap>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol className="ion-text-center">
              <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

    </IonPage>
  );
};

export default NewMemory;
