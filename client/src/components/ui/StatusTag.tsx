interface StatusTagProps {
  status: string
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const getStatusTagStyle = (): React.CSSProperties => {
    const commonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1px 5px',
      paddingTop: '3px',
      borderRadius: '5px',
      fontSize: '11px',
      textTransform: 'capitalize',
      fontWeight: 500,
      letterSpacing: '1px',
      margin: '1rem 0',
      cursor: 'pointer'
    }

    switch (status.toLowerCase()) {
      case 'applied':
        return {
          ...commonStyle,
          backgroundColor: '#87CEEB',
          color: '#000080'
        }
      case 'assigned':
        return {
          ...commonStyle,
          backgroundColor: '#d9f99d',
          color: '#365314'
        }
      case 'interview not attended':
        return {
          ...commonStyle,
          backgroundColor: '#FF6961',
          color: '#8B0000'
        }
      case 'did not join':
        return {
          ...commonStyle,
          backgroundColor: '#FFD700',
          color: '#8B4513'
        }
      case 'rejected':
        return {
          ...commonStyle,
          backgroundColor: '#fecdd3',
          color: '#881337'
        }
      case 'offered':
        return {
          ...commonStyle,
          backgroundColor: '#67e8f9',
          color: '#083344'
        }
      case 'selected':
        return {
          ...commonStyle,
          backgroundColor: '#c7d2fe',
          color: '#312e81'
        }
      case 'placed':
        return {
          ...commonStyle,
          backgroundColor: '#dcfce7',
          color: '#14532d'
        }
      default:
        return commonStyle
    }
  }

  return (
    <div style={getStatusTagStyle()}>
      <span>{status}</span>
    </div>
  )
}

export default StatusTag
