import React, { useRef } from "react";
import { IonAvatar, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { ban, trash, create } from "ionicons/icons";

export const FRIENDS_DATA = [
  { id: 'f1', name: 'John Thor', avatar: 'john-thor' },
  { id: 'f2', name: 'John Ness', avatar: 'john-ness' },
  { id: 'f3', name: 'John Doe', avatar: 'john-doe' },
];

const Meet: React.FC = () => {
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const callFriendHandler = () => {
    console.log("Calling...");
  };

  const blockFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Blocking...");
  };

  const editFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Editing...");
  };

  const deleteFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Deleting...");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Meet</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {FRIENDS_DATA.map(friend => (
            <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={blockFriendHandler}>
                  <IonIcon slot="icon-only" icon={ban} />
                </IonItemOption>
                <IonItemOption color="warning" onClick={deleteFriendHandler}>
                  <IonIcon slot="icon-only" icon={trash} />
                </IonItemOption>
              </IonItemOptions>
              <IonItemOptions side="end">
                <IonItemOption color="warning" onClick={editFriendHandler}>
                  <IonIcon slot="icon-only" icon={create} />
                </IonItemOption>
              </IonItemOptions>
              <IonItem lines="full" button detail onClick={callFriendHandler}>
                <IonAvatar>
                  <IonImg src={`https://avatars.dicebear.com/api/avataaars/${friend.avatar}.svg`} alt={`${friend.name}`} />
                </IonAvatar>
                <IonLabel className="ion-margin-horizontal">{friend.name}</IonLabel>
              </IonItem>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Meet;
