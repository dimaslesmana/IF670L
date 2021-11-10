import React, { useEffect, useRef, useState } from 'react';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import axios from 'axios';

interface Student {
  nim: string;
  nama: string;
  prodi: string;
  foto?: string;
}

const Home: React.FC = () => {
  const BASE_URL = 'http://localhost:4000';
  const API_URL = `${BASE_URL}/api/students`;

  const [students, setStudents] = useState<Array<Student>>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(API_URL);

        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setIsDataFetched(false);
  }, [isDataFetched]);

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
  };

  const insertHandler = async () => {
    const formData = new FormData();

    const inNim = nim.current?.value as string;
    const inNama = nama.current?.value as string;
    const inProdi = prodi.current?.value as string;
    const inFile = selectedFile as File

    if (!inNim || !inNama || !inProdi || !selectedFile) {
      return;
    }

    formData.append('nim', inNim);
    formData.append('nama', inNama);
    formData.append('prodi', inProdi);
    formData.append('foto', inFile);

    try {
      await axios.post(API_URL, formData);
      setIsDataFetched(true);

      nim.current!.value = '';
      nama.current!.value = '';
      prodi.current!.value = '';
      setSelectedFile(undefined);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Week10-41281 Tutorial</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          {students.length ? (
            students.map((student) => (
              <IonItem key={student.nim}>
                <IonAvatar slot="start">
                  <img src={`${BASE_URL}/${student.foto ?? 'uploads/avatar-placeholder.png'}`} alt={student.nama}
                  />
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
            <IonLabel position="floating">NIM</IonLabel>
            <IonInput ref={nim} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Nama</IonLabel>
            <IonInput ref={nama} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Prodi</IonLabel>
            <IonInput ref={prodi} />
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
