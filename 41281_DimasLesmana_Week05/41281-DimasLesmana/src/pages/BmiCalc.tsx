import { useRef, useState, Fragment } from 'react';
import {
  IonAlert,
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/react';

import BmiResult from '../components/BmiResult/BmiResult';
import BmiControls from '../components/BmiControls/BmiControls';
import InputControl from '../components/InputControl';

const BmiCalc: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');
  const [error, setError] = useState<string>();
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  const calculateBMI = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;

    if (!enteredHeight || !enteredWeight || +enteredHeight <= 0 || +enteredWeight <= 0 || !+enteredHeight || !+enteredWeight) {
      setError("Please enter a valid (non-negative) input number!");
      return;
    }

    const heightConversionFactor = (calcUnits === 'ftlbs') ? 0.0328 : 1;
    const weightConversionFactor = (calcUnits === 'ftlbs') ? 2.2 : 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const bmi = weight / ((height / 100) * (height / 100));

    if (bmi >= 18.5 && bmi <= 24.9) {
      setDescription("Normal");
    } else if (bmi >= 25 && bmi <= 29.9) {
      setDescription("Gemuk");
    } else if (bmi < 18.5) {
      setDescription("Kurus");
    } else if (bmi >= 30) {
      setDescription("Obesitas");
    }

    setCalculatedBMI(bmi);
  };

  const clearError = () => {
    setError('');
  }

  const resetInputs = () => {
    heightInputRef.current!.value = '';
    weightInputRef.current!.value = '';
    setCalculatedBMI(0);
    setError('');
  };

  return (
    <Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          { text: 'Okay', handler: clearError }
        ]} />

      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref="home" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                <IonGrid className="ion-no-padding">
                  <IonRow>
                    <IonCol>
                      <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} resetInputHandler={resetInputs} />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">Tinggi badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                        <IonInput ref={heightInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">Berat badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                        <IonInput ref={weightInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
                  <BmiResult bmiResult={calculatedBMI} bmiDescription={description} />
                </IonGrid>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonApp>
    </Fragment>
  );
};

export default BmiCalc;
