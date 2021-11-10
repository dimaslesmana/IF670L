import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MemoriesContext, { Memory } from "./memories-context";

const MemoriesContextProvider: React.FC = (props) => {
  const BASE_URL = 'http://localhost:4000';
  const API_URL = `${BASE_URL}/api/memories`;

  const [memories, setMemories] = useState<Memory[]>([]);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(API_URL);

        setMemories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setIsDataFetched(false);
  }, [isDataFetched]);

  const addMemory = async (base64Data: string, title: string, type: 'good' | 'bad', location: { lat: number, lng: number }) => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('type', type);
    formData.append('photo', base64Data);
    formData.append('lat', location.lat.toString());
    formData.append('lng', location.lng.toString());

    try {
      await axios.post(API_URL, formData);

      setIsDataFetched(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MemoriesContext.Provider value={{ memories, addMemory }}>
      {props.children}
    </MemoriesContext.Provider>
  );
};

export default MemoriesContextProvider;
