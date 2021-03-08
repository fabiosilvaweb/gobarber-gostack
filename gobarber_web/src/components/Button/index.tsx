import React, { ButtonHTMLAttributes } from 'react';

import * as Styled from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; 

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Styled.Container type="button" {...rest} >
      { children }
    </Styled.Container>
  );
}

export default Button;
