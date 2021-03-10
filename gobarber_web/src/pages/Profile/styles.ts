import styled from 'styled-components';
import { shade } from 'polished';
export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

export const AvatarInput = styled.div`
  margin-top: -4%;
  position: relative;
  width: 186px;
  align-self: center;

  img {
    border-radius: 50%;
    width: 186px;
    height: 186px;
   
  }

  > label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--primary);
    bottom: 0;
    right: 0;
    transition: background 0.5s;

    color: var(--dark);
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: ${shade(0.2, "#ff9000")}
    }

    input {
      display: none;
    }

  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  
  width: 100%;

  form {
    margin: 80px auto;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    > a {
      color: var(--white);
      display: inline-block;
      margin-top: 16px;

      transition: color 0.5s;

      &:hover {
        color: ${shade(0.2, '#fff')}
      }
    }

    button {
      margin-top: 24px;
    }
  }
`;

export const Header = styled.header`
  background: var(--input);
  padding: 32px;
  height: 144px;

  display: flex;
  align-items: center;

  > a {
    color: var(--text);
    display: inline-flex;
    transition: color 0.5s;

    svg {
      margin-right: 8px;
    }

    &:hover {
      color: ${shade(0.2, '#fff')}
    }
  }
`;
