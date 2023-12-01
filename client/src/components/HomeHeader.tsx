import React from 'react'
import { UserInformation } from './UserInformation'
import Loader from './ui/Loader'

export const HomeHeader: React.FC<{
  currentUser: any
  loading: boolean,
  children?: React.ReactNode
}> = ({currentUser, loading, children})=>{
  return (
    <div className="home__header">
      <UserInformation currentUser={currentUser} />
      <div className="pie__chart">
        {loading ? (
          <Loader />
        ) : (
          children
        )}
      </div>
    </div>
  )
}
