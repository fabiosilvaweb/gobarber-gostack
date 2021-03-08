import styled from 'styled-components';

export const Container = styled.div`
  background: var(--input);
  border: 2px solid var(--input);
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  color:var(--text-dark);
  
  display: flex;
  align-items: center;

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
