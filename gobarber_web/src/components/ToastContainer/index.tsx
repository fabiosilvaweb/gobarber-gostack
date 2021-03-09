import React from 'react';

import { useTransition } from 'react-spring';

import * as Styled from './styles';

import { ToastMessage } from '../../hooks/Toast';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

  const messagesWithTransitions = useTransition(messages, (message) => message.id, {
    from:  { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 }
  });

  return (
    <Styled.Container>

     { messagesWithTransitions && messagesWithTransitions.map(({ item, key, props  }) => (
        <Toast key={key} message={item} style={props} />
     )) }
      
    </Styled.Container>
  );
}

export default ToastContainer;
