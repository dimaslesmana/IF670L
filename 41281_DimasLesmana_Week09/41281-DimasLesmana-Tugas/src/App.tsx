import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import MemoriesContext, { Memory } from './data/memories-context';

import NavTab from './components/NavTab';

import NewMemory from './pages/NewMemory';

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
  const memoriesCtx = useContext(MemoriesContext);
  const { initContext } = memoriesCtx;

  useEffect(() => {
    initContext();
  }, [initContext]);

  return (
    <IonApp>
      <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/tabs" component={NavTab} />
            <Route exact path="/new-memory" component={NewMemory} />

            <Redirect exact from="/" to="/tabs" />
          </IonRouterOutlet>
        </IonReactRouter>
      </LoadScript>
    </IonApp>
  );
};

export default App;
