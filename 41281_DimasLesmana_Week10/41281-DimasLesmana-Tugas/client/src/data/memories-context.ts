import React, { createContext } from 'react';

export interface Memory {
  id: string;
  title: string;
  type: 'good' | 'bad';
  photo: string;
  location: { lat: number, lng: number };
}

const MemoriesContext = createContext<{
  memories: Memory[];
  addMemory: (base64Data: string, title: string, type: 'good' | 'bad', location: { lat: number, lng: number }) => void;
}>({
  memories: [],
  addMemory: () => { },
});

export default MemoriesContext;
