import { useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';

import './Home.css';

const Home: React.FC = () => {
  const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
  const nullEntry: any[] = [];
  const [notifications, setNotifications] = useState(nullEntry);

  useEffect(() => {
    if (!isPushNotificationsAvailable) {
      return;
    }

    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== 'granted') {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === 'denied') {
            showToast("Push Notifications permission denied");
          } else {
            showToast("Push Notifications permission granted");
            registerPush();
          }
        });
      } else {
        registerPush();
      }
    });
  });

  const showToast = async (message: string) => {
    await Toast.show({
      text: message,
    })
  };

  const registerPush = () => {
    if (!isPushNotificationsAvailable) {
      return;
    }

    console.log('Initializing HomePage');

    // Register with Apple/Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      showToast("Push registration success");
      console.log("Push registration success");
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
      console.log("Push registration error: ", JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      setNotifications(notifications => [...notifications, {
        id: notification.id,
        title: notification.title,
        body: notification.body,
        type: 'foreground',
      }]);

      console.log('notification:', notification);
      console.log('notifications:', notifications);
    });

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      setNotifications(notifications => [...notifications, {
        id: notification.notification.data.id,
        title: notification.notification.data.title,
        body: notification.notification.data.body,
        type: 'action',
      }]);

      console.log('notification:', notification);
      console.log('notifications:', notifications);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tutorial Week12</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <ol>
              <li>Register for Push by clicking the footer button.</li>
              <li>Once registered, you can send push from Firebase console.</li>
              <li>Once your app receives notifications, you'll see the data here in the list.</li>
            </ol>
          </IonCardContent>
        </IonCard>

        <IonListHeader>
          <IonLabel>Notifications</IonLabel>
        </IonListHeader>

        <IonList>
          {notifications.map((notif) => (
            <IonItem key={notif.id}>
              <IonLabel>
                <IonText>
                  <h3>{notif.title}</h3>
                </IonText>
                <p>{notif.body}</p>
                {notif.type === 'foreground' && <p>This data was received in foreground</p>}
                {notif.type === 'action' && <p>This data was received on tap</p>}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton color="success" expand="full" onClick={registerPush}>Register for Push</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
