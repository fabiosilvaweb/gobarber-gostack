import React, { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/Toast';

import * as Styled from './styles';

interface ToastContainerProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo/>,
  success: <FiCheckCircle/>,
  error: <FiAlertCircle />
};

const Toast: React.FC<ToastContainerProps> = ({ message, style }) => {
  const { removerToast } = useToast();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      removerToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    }

  }, [removerToast, message.id]);

  return (
    <Styled.Toast key={message.id} type={ message.type } hasDescription={Number(!!message.description)} style={style}>
      { icons[message.type || 'info'] }

      <div>
        <strong>{ message.title }</strong>
        { message.description && <p>{ message.description }</p> }
      </div>

      <button onClick={() => { removerToast(message.id) } } type="button">
        <FiXCircle size={20} />
      </button>
    </Styled.Toast>
  );
}

export default Toast;
