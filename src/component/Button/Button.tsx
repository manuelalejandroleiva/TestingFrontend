
import React from 'react';



interface Props {
  children: React.ReactNode;
  onClick: () => void;
  type?: 'reset' | 'button' | 'submit';
  disabled?:boolean,
  className?: string;
  
 
}



export function Button({
  children,
  onClick,
  className,
  type = 'button',
 
 
  disabled = false,
 
}: Props) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={ className}
    >
      {children}
    </button>
  );
}