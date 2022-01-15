import { useField } from '@unform/core';
import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';

import { SelectBlock } from './stlyes';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  label?: string;
}

const Select: React.FC<Props> = ({ name, label, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <SelectBlock>
      <label htmlFor={name}>{label}</label>

      <ReactSelect
        placeholder="Selecione..."
        styles={{ option: provided => ({ ...provided, fontSize: 14 }) }}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
    </SelectBlock>
  );
};

export default Select;
