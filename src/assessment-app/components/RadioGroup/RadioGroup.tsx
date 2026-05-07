import './RadioGroup.css';

interface Option {
  id: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioGroup({ name, options, value, onChange, className = '' }: RadioGroupProps) {
  return (
    <div className={`radio-group ${className}`}>
      {options.map((option) => (
        <label key={option.id} className={`radio-option ${option.disabled ? 'radio-option--disabled' : ''}`}>
          <input
            type="radio"
            name={name}
            value={option.id}
            checked={value === option.id}
            onChange={(e) => onChange(e.target.value)}
            disabled={option.disabled}
            className="radio-input"
          />
          <span className="radio-custom"></span>
          <span className="radio-label">{option.label}</span>
        </label>
      ))}
    </div>
  );
}