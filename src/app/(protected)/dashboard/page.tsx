"use client"

import { useUser } from '@clerk/nextjs'
import React from 'react'

const DashboardPage = () => {

  const { user } = useUser();

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  )
}

export default DashboardPage