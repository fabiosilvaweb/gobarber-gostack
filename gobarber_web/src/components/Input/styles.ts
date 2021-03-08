import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--input);
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid var(--input);
  color:var(--text-dark);
  
  display: flex;
  align-items: center;

  ${ props => props.isFocused && css`
    border: 2px solid var(--primary);
    color:var(--primary);
  `}

  ${ props => props.isFilled && css`
    color:var(--primary);
  `}

  input {
    color: var(--white);
    flex: 1;
    background: transparent;
    border: 0;


    &::placeholder {
      color:var(--text-dark);
    }

  }

  svg {
    margin-right: 16px;
  }

  & + div {
    margin-top: 16px;
  }
`;
