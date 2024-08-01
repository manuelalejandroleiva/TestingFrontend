import { useState } from 'react';
import type { ReactNode } from 'react';

import classNames from 'classnames';
import React from 'react';






interface Props {
  onChange: (text: string) => void;
  label?: string;
  hasError?: boolean;
  placeholder?: string;
  leftAdornment?: ReactNode;
  error:string
  value:string
  classname:string;
  rightAdornment?: ReactNode;
}

export function Input({
  label,
  hasError = false,
  error,
  value,
  leftAdornment,
    classname,
  rightAdornment,
  placeholder,
  onChange,
}: Props) {
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleFocus = () => {
    setHasFocus(true);
  };

  const handleBlur = () => {
    setHasFocus(false);
  };

  return (
    <div>
      {label && (
        <label htmlFor="first_name" className="ml-2 block tracking-wider">
          
            {label}
          
        </label>
      )}
      <div
        className={classname}
      >
        {leftAdornment}
        <input
          type="text"
          id="first_name"
          placeholder={placeholder}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleOnChange}
          
          
        />
        {rightAdornment}
      </div>

      <h4  style={{color:'GrayText'}}>
        {error}
      </h4>
     
    </div>
  );
}
