import React, { useContext } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import { GoogleMap, Marker } from '@react-google-maps/api';

import MemoriesContext from '../data/memories-context';

const MemoryItem: React.FC<{ memoryType: 'good' | 'bad' }> = (props) => {
  const memoriesCtx = useContext(MemoriesContext);
  const memories = memoriesCtx.memories.filter((memory) => memory.type === props.memoryType);

  const mapContainerStyle = {
    width: '100%',
    height: '20vh',
  };

  if (!memories.length) {
    return (
      <IonGrid>
        <IonRow>
          <IonCol className="ion-text-center">
            <h2>No {props.memoryType} memories found.</h2>
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  }

  return (
    <IonGrid>
      {memories.map((memory) => (
        <IonRow key={memory.id}>
          <IonCol>
            <IonCard>
              <img src={memory.base64Url} alt={memory.title} />
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={memory.location}
                zoom={14}>

                <Marker position={memory.location} />
              </GoogleMap>
              <IonCardHeader>
                <IonCardTitle>{memory.title}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default MemoryItem;