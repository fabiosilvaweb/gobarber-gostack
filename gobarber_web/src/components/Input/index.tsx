import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons';

import { useField } from '@unform/core';

import * as Styled from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ( { name, icon: Icon, ...rest } ) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);

  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);

  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref:inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <Styled.Container isFocused={isFocused} isFilled={isFilled}>
      { Icon &&  <Icon size={20} />}
      <input 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef} 
        placeholder="" {...rest} 
        defaultValue={defaultValue}
      />
    </Styled.Container>
  );
}

export default Input;
