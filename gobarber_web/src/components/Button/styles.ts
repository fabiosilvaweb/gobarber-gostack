import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.button`
  background: var(--primary);
  height: 56px;
  color: var(--dark);
  border: 0;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  margin-top: 16px;
  font-weight: 500;

  letter-spacing: .8px;

  transition: background 0.5s;

  &:hover {
    background: ${shade(0.2, '#ff9000')}
  }

  &:disabled {
    opacity: 0.3;
    cursor: no-drop;

    &:hover {
      background: var(--primary);
    }
  }
  
`;
