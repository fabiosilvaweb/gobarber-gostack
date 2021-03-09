import React, { ButtonHTMLAttributes } from 'react';

import * as Styled from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
}; 

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Styled.Container type="button" disabled={loading} {...rest}  >
      { loading ? 'Carregando...' : children }
    </Styled.Container>
  );
}

export default Button;
