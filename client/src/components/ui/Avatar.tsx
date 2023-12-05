
import React from 'react'

interface AvatarProps {
  name: string
  size?: number
}
// const colors = [
//   '#3730a3',
//   '#083344',
//   '#c026d3',
//   '#FF9800',
//   '#f9a8d4',
//   '#be123c',
//   '#7e22ce'
// ]

// const getRandomColor = () => {
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex];
// };
const Avatar: React.FC<AvatarProps> = ({ name, size = 50 }) => {
  // Extract the first character of the name
  const firstCharacter = name.charAt(0).toUpperCase()

  return (
    <div
      style={{
        borderRadius: '50%',
        width: size,
        height: size,
        backgroundColor: '#581c87', // Background color for the circular avatar
        color: '#ffffff', // Text color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size / 2, // Adjust font size based on the avatar size
        cursor: 'pointer'
      }}>
      {firstCharacter}
    </div>
  )
}

export default Avatar
