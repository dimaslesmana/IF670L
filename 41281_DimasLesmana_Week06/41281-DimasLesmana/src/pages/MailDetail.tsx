import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useParams } from "react-router-dom";

import { MAIL_DATA } from "./Mail";

const MailDetail: React.FC = () => {
  const mailId = useParams<{mailId: string}>().mailId;
  const selectedMail = MAIL_DATA.find(mail => mail.id === mailId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/mail" />
          </IonButtons>
          <IonTitle>
            {selectedMail ? selectedMail?.subject : 'No mail found'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Mail ID: {mailId}</h2>
      </IonContent>
    </IonPage>
  );
};

export default MailDetail;
