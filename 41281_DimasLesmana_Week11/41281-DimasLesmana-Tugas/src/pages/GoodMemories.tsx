import React from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform
} from '@ionic/react';
import { add } from 'ionicons/icons';

import MemoryItem from '../components/MemoryItem';

const GoodMemories: React.FC = () => {
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color="primary">
          {isPlatform('ios') && (
            <IonButtons slot="end">
              <IonButton routerLink="/new-memory">
                <IonIcon slot="icon-only" icon={add} />
              </IonButton>
            </IonButtons>
          )}
          <IonTitle>Good Memories</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <MemoryItem memoryType="good" />

        {isPlatform('android') && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton color="primary" routerLink="/new-memory">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>

    </IonPage>
  );
};

export default GoodMemories;
