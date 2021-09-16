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
  IonList,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
} from '@ionic/react';

import BmrResult from '../components/BmrResult/BmrResult';
import BmrControls from '../components/BmrControls/BmrControls';
import InputControl from '../components/InputControl';

const BmrCalc: React.FC = () => {
  const [calculatedBMR, setCalculatedBMR] = useState<number>(0);
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [error, setError] = useState<string>();

  const ageInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  const genderChangeHandler = (event: CustomEvent) => {
    setGender(event.detail.value);
  };

  const calculateBMR = () => {
    const enteredAge = ageInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;

    if (!enteredHeight || !enteredWeight || !enteredAge || +enteredHeight <= 0 || +enteredWeight <= 0 || +enteredAge <= 0 || !+enteredHeight || !+enteredWeight || !+enteredAge) {
      setError("Please enter a valid input number!");
      return;
    }

    const heightConversionFactor = (calcUnits === 'ftlbs') ? 0.0328 : 1;
    const weightConversionFactor = (calcUnits === 'ftlbs') ? 2.2 : 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const genderValue = (gender === 'male') ? 66 : 655;
    const weightMultiplier = (gender === 'male') ? 13.7 : 9.6;
    const heightMultiplier = (gender === 'male') ? 5 : 1.8;
    const ageMultiplier = (gender === 'male') ? 6.8 : 4.7;

    const multipliedWeight = weightMultiplier * weight;
    const multipliedHeight = heightMultiplier * height;
    const multipliedAge = ageMultiplier * +enteredAge;

    const bmr = genderValue + multipliedWeight + multipliedHeight - multipliedAge;

    setCalculatedBMR(bmr);
  };

  const resetInputs = () => {
    ageInputRef.current!.value = '';
    heightInputRef.current!.value = '';
    weightInputRef.current!.value = '';
    setCalculatedBMR(0);
    setError('');
  };

  const clearError = () => {
    setError('');
  }

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
            <IonTitle>BMR Calculator</IonTitle>
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
                        <IonLabel position="floating">Age</IonLabel>
                        <IonInput ref={ageInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonList>
                        <IonRadioGroup value={gender} onIonChange={genderChangeHandler}>
                          <IonListHeader>
                            <IonLabel>Gender</IonLabel>
                          </IonListHeader>
                          <IonRow>
                            <IonCol>
                              <IonItem>
                                <IonLabel>Male</IonLabel>
                                <IonRadio slot="start" value="male" />
                              </IonItem>
                            </IonCol>
                            <IonCol>
                              <IonItem>
                                <IonLabel>Female</IonLabel>
                                <IonRadio slot="start" value="female" />
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonRadioGroup>
                      </IonList>
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
                  <BmrControls onCalculate={calculateBMR} onReset={resetInputs} />
                  <BmrResult bmrResult={calculatedBMR} />
                </IonGrid>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonApp>
    </Fragment>
  );
};

export default BmrCalc;
