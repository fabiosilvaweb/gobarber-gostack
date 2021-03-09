import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removerToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {

  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(( { title, description, type } : Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      title, 
      description, 
      type
    }

    setMessages(state => [...state, toast]);

  }, []);

  const removerToast = useCallback((id: string) => {
    setMessages( state => state.filter(message => message.id !== id ));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removerToast }}>
      { children }
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}


export { useToast, ToastProvider };
