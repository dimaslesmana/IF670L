import React from 'react';
import { IonCard, IonCardContent, IonCol, IonRow } from '@ionic/react';

const BmiResult: React.FC<{
  bmiResult: number,
  bmiDescription: string
}> = (props) => {

  if (!props.bmiResult) {
    return null;
  }

  return (
    <IonRow>
      <IonCol>
        <IonCard>
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
