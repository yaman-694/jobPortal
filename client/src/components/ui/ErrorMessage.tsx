import React, { useEffect, useState } from 'react'

interface ErrorMessageProps {
  message: string
}

const styleError: React.CSSProperties = {
  color: 'white',
  fontSize: '1.8rem',
  backgroundColor: '#ef4444',
  padding: '1rem 4rem',
  borderRadius: '5px',
  border: '1px solid #dc2626',
  margin: '1rem 0',
  textAlign: 'center' as const
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return isVisible ? (
    <div className="error">
      <p style={styleError}>{message}</p>
    </div>
  ) : null
}
