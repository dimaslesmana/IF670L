import React, { createContext } from 'react';

export interface Memory {
  id: string;
  title: string;
  type: 'good' | 'bad';
  location: { lat: number, lng: number };
  fileName: string;
  photoUrl: string;
}

const MemoriesContext = createContext<{
  memories: Memory[];
  addMemory: (title: string, type: 'good' | 'bad', location: { lat: number, lng: number }, fileName: string, base64: string) => void;
}>({
  memories: [],
  addMemory: () => { },
});

export default MemoriesContext;
