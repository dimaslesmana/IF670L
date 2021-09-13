import React from 'react';
import { IonCard, IonCardContent, IonCol, IonRow } from '@ionic/react';

const BmrResult: React.FC<{
  bmrResult: number,
}> = ({ bmrResult }) => {

  if (!bmrResult) {
    return null;
  }

  return (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonCardContent className="ion-text-center">
            <h2>BMR = {bmrResult.toFixed(2)} Calories/day</h2>
            <h2>Daily calorie needs based on activity level</h2>
            <IonRow>
              <IonCol className="ion-text-start">
                <h2><strong>Activity Level</strong></h2>
              </IonCol>
              <IonCol className="ion-text-end">
                <h2><strong>Calorie</strong></h2>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="ion-text-start">
                <h2>Sedentary: little or no exercise</h2>
              </IonCol>
              <IonCol className="ion-text-end">
                <h2>{(bmrResult * 1.2).toFixed(2)}</h2>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="ion-text-start">
                <h2>Exercise 1-3 times/week</h2>
              </IonCol>
              <IonCol className="ion-text-end">
                <h2>{(bmrResult * 1.375).toFixed(2)}</h2>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="ion-text-start">
                <h2>Exercise 4-5 times/week</h2>
              </IonCol>
              <IonCol className="ion-text-end">
                <h2>{(bmrResult * 1.55).toFixed(2)}</h2>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="ion-text-start">
                <h2>Daily exercise or intense exercise 3-4 times/week</h2>
              </IonCol>
              <IonCol className="ion-text-end">
                <h2>{(bmrResult * 1.725).toFixed(2)}</h2>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="ion-text-start">
                <h2>Intense exercise 6-7 times/week</h2>
              </IonCol>
              <IonCol className="ion-text-end">
                <h2>{(bmrResult * 1.9).toFixed(2)}</h2>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BmrResult;
