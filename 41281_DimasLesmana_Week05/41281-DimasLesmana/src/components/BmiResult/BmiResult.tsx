import React from 'react';
import { IonCard, IonCardContent, IonCol, IonRow } from '@ionic/react';

import './BmiResult.css';

const BmiResult: React.FC<{
  bmiResult: number,
  bmiDescription: string
}> = (props) => {
  if (!props.bmiResult) {
    return null;
  }

  const cardColor = () => {
    switch (props.bmiDescription) {
      case 'Normal':
        return 'ion-card-success';
      case 'Gemuk':
      case 'Kurus':
        return 'ion-card-warning';
      case 'Obesitas':
        return 'ion-card-danger';
    }
  };

  return (
    <IonRow>
      <IonCol>
        <IonCard id="result" className={cardColor()}>
          <IonCardContent className="ion-text-center">
            <h2>{props.bmiResult.toFixed(2)}</h2>
            <h1>{props.bmiDescription}</h1>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BmiResult;
