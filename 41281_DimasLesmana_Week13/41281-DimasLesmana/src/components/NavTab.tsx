import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { happy, sad } from 'ionicons/icons';

import GoodMemories from '../pages/GoodMemories';
import BadMemories from '../pages/BadMemories';

const NavTab: React.FC = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/good-memories" component={GoodMemories} />
        <Route exact path="/tabs/bad-memories" component={BadMemories} />

        <Redirect exact from="/tabs" to="/tabs/good-memories" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" color="primary">
        <IonTabButton tab="good-memories" href="/tabs/good-memories">
          <IonIcon icon={happy} />
          <IonLabel>Good Memories</IonLabel>
        </IonTabButton>

        <IonTabButton tab="bad-memories" href="/tabs/bad-memories">
          <IonIcon icon={sad} />
          <IonLabel>Bad Memories</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default NavTab;