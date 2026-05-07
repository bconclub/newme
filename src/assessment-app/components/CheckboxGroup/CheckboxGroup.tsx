import './CheckboxGroup.css';

interface Option {
  id: string;
  label: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  name: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  maxSelections?: number;
  className?: string;
}

export function CheckboxGroup({ 
  name, 
  options, 
  values, 
  onChange, 
  maxSelections,
  className = '' 
}: CheckboxGroupProps) {
  const handleChange = (optionId: string, checked: boolean) => {
    if (checked) {
      if (maxSelections && values.length >= maxSelections) {
        return; // Don't allow more selections than max
      }
      onChange([...values, optionId]);
    } else {
      onChange(values.filter(value => value !== optionId));
    }
  };

  return (
    <div className={`checkbox-group ${className}`}>
      {maxSelections && (
        <p className="checkbox-group__note">
          Select up to {maxSelections} {maxSelections === 1 ? 'option' : 'options'} 
          {values.length > 0 && ` (${values.length}/${maxSelections} selected)`}
        </p>
      )}
      {options.map((option) => {
        const isChecked = values.includes(option.id);
        const isDisabled = option.disabled || 
          (maxSelections && !isChecked && values.length >= maxSelections);
        
        return (
          <label 
            key={option.id} 
            className={`checkbox-option ${isDisabled ? 'checkbox-option--disabled' : ''}`}
          >
            <input
              type="checkbox"
              name={name}
              value={option.id}
              checked={isChecked}
              onChange={(e) => handleChange(option.id, e.target.checked)}
              disabled={!!isDisabled}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-label">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}