// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import React from 'react';

interface CheckboxProps {
  children?: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ children, disabled, checked, onChange }) => {
  const inputId = 'checkbox-input';
  return (
    <label htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({ target }) => onChange(target.checked)}
      />
      {children}
    </label>
  );
};

Checkbox.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  children: null,
  disabled: false,
  checked: false,
};

export default Checkbox;
