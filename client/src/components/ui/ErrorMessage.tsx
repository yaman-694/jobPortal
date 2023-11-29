import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const styleError: React.CSSProperties = {
  color: 'white',
  fontSize: '1.8rem',
  backgroundColor: '#ef4444',
  padding: '1rem 4rem',
  borderRadius: '5px',
  border: '1px solid #dc2626',
  margin: '1rem 0',
  textAlign: 'center' as const // Specify 'center' as a const value
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div>
      <p style={styleError}>{message}</p>
    </div>
  );
}
