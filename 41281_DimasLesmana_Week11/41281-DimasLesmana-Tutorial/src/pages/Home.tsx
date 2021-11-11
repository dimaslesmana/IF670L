import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonAvatar } from '@ionic/react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { firebaseApp } from '../firebaseConfig';

import './Home.css';

const Home: React.FC = () => {
  const [students, setStudents] = useState<Array<any>>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState<string>('');
  const [isAddData, setIsAddData] = useState<boolean>(false);

  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);

  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, 'week11_tutorial_users'));
      console.log('querySnapshot:', querySnapshot);

      setStudents(querySnapshot.docs.map((doc) => (
        {
          ...doc.data(),
          id: doc.id
        }
      )));

      querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        console.log('doc:', doc);
      });
    };

    getData();
    setIsAddData(false);
  }, [isAddData]);

  const addData = async (url: string) => {
    try {
      const docRef = await addDoc(collection(db, 'week11_tutorial_users'), {
        nim: nim.current?.value,
        nama: nama.current?.value,
        prodi: prodi.current?.value,
        foto: fileName,
        fotoUrl: url,
      });

      nim.current!.value = '';
      nama.current!.value = '';
      prodi.current!.value = '';

      setIsAddData(true);

      console.log(`Document written with ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
    setFileName(`${new Date().getTime()}-${event.target!.files![0].name}`);
  };

  const insertHandler = async () => {
    const inputNim = nim.current?.value;
    const inputNama = nama.current?.value;
    const inputProdi = prodi.current?.value;

    if (!inputNim || !inputNama || !inputProdi || !selectedFile) {
      return;
    }

    const storageRef = ref(storage, `week11_tutorial_uploads/${fileName}`);

    try {
      await uploadBytes(storageRef, selectedFile as Blob);

      console.log(`Upload File Success! - ${fileName}`);

      const url = await getDownloadURL(storageRef);
      addData(url);

      setSelectedFile(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tutorial Week-11</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {students.length ? (
            students.map((student) => (
              <IonItem key={student.id}>
                <IonAvatar slot="start">
                  <img src={student.fotoUrl} alt={student.nama} />
                </IonAvatar>
                <IonLabel>
                  {student.nim}
                  <br />
                  {student.nama}
                  <br />
                  {student.prodi}
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <p className="ion-text-center">
              Tidak ada mahasiswa yang ditemukan.
            </p>
          )}
        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>Add Student</IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>NIM</IonLabel>
            <IonInput ref={nim}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Nama</IonLabel>
            <IonInput ref={nama}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel>Prodi</IonLabel>
            <IonInput ref={prodi}></IonInput>
          </IonItem>

          <IonItem>
            <input type="file" onChange={fileChangeHandler} />
          </IonItem>

          <IonButton onClick={insertHandler}>Simpan</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
