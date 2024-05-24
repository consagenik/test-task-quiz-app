import React from 'react';

import './CheckboxFieldsGroup.scss';

import {CheckboxField} from "../checkboxField";

interface CheckboxFieldsGroupProps {
  name: string;
  value: number;
  data: any[];
  onChange: (key: string, value: number) => void;
  label?: string;
}

export default function CheckboxFieldsGroup({name, label, value, data, onChange}: CheckboxFieldsGroupProps) {
  return (
    <div className="checkboxFieldsGroup">
      {label && <p className="label">{label}</p>}

      <div className="fieldsList">
        {data.map((item) => (
          <CheckboxField
            id={item.id}
            key={item.id}
            label={item.name}
            name={item.name}
            value={item.id === value}
            onChange={() => onChange(name, item.id)}
          />
        ))}
      </div>
    </div>
  );
}
