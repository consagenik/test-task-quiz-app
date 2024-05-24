import './Selector.scss';

interface SelectorProps {
  data: any[];
  keyName: string;
  name: string;
  value: any;
  onChange: (value: any) => void;
  label?: string;
}

export default function Selector({data, keyName, name, value, onChange, label}: SelectorProps) {
  return (
    <div className="selector">
      {label && <label htmlFor={name}>{label}</label>}

      <select
        name={name}
        id={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {data.map((item) => (
          <option key={item[keyName]} value={item[keyName]}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
