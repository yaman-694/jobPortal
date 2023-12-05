import React from 'react'
import { UserInformation } from './UserInformation'

export const HomeHeader: React.FC<{
  currentUser: any
}> = ({ currentUser }) => {
  return (
    <div className="home__header">
      <UserInformation currentUser={currentUser} />
    </div>
  )
}
