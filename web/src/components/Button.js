import React from 'react';

export function Button({ children, primary, ...rest }) {
  const className = 'Button' + (primary ? ' Button--primary' : '');

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
