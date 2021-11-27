import React, { useEffect, useState } from 'react';

import MemoriesContext, { Memory } from "./memories-context";

import { getAllMemories, insertNewMemory } from '../services/firebase';

const MemoriesContextProvider: React.FC = (props) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMemories();

        setMemories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setIsDataFetched(false);
  }, [isDataFetched]);

  const addMemory = async (title: string, type: 'good' | 'bad', location: { lat: number, lng: number }, fileName: string, base64: string) => {
    const base64Response = await fetch(base64);
    const photoBlob = await base64Response.blob();

    await insertNewMemory(title, type, location, fileName, photoBlob);

    setIsDataFetched(true);
  };

  return (
    <MemoriesContext.Provider value={{ memories, addMemory }}>
      {props.children}
    </MemoriesContext.Provider>
  );
};

export default MemoriesContextProvider;
