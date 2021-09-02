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
  IonToolbar
} from '@ionic/react';
import BmiResult from './components/BmiResult';
import BmiControls from './components/BmiControls';
import InputControl from './components/InputControl';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
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
          <IonToolbar>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonGrid>
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
        </IonContent>
      </IonApp>
    </Fragment>
  );
};

export default App;
