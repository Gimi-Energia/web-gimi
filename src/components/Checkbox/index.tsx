import React, { SelectHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends SelectHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  checked?: boolean;
}

const Checkbox: React.FC<InputProps> = ({ label, name, checked, ...rest }) => (
  <Container>
    <input type="checkbox" checked={checked} id={name} {...rest} />
    <label htmlFor={name}>{label}</label>
  </Container>
);

export default Checkbox;
