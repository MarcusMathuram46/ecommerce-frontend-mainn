import React from "react";
import PropTypes from "prop-types";

const CustomInput = ({
  type,
  name,
  placeholder,
  className,
  value,
  onChange,
  onBlur,
  disabled,
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${className}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
};

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
};

CustomInput.defaultProps = {
  placeholder: "",
  className: "",
  disabled: false,
};

export default CustomInput;
