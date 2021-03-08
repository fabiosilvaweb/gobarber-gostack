import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import * as Styled from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ( { icon: Icon, ...rest } ) => {
  return (
    <Styled.Container>
      { Icon &&  <Icon size={20} />}
      <input placeholder="" {...rest} />
    </Styled.Container>
  );
}

export default Input;
