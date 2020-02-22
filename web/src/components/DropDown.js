import React from 'react';

export function DropDown({ children, ...rest }) {
  return (
    <select className="DropDown" {...rest}>
      {children}
    </select>
  );
}
