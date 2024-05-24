import React from 'react';

import './CheckboxField.scss';

import {CheckboxButton} from "../checkboxButton";

interface CheckboxFieldProps {
  id: string
  label: string
  name: string
  value: boolean
  onChange: () => void
}

export default function CheckboxField({id, label, name, value, onChange}: CheckboxFieldProps) {
  return (
    <div className="checkboxField">
      <label htmlFor={id}>
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={value}
          onChange={onChange}
        />
        <CheckboxButton checked={value}/>
        {label}
      </label>
    </div>
  );
}
