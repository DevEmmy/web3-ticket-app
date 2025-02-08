import DashboardLayout from '@/components/layouts/DashboardLayout'
import React, { FC } from 'react'

interface Props{
  children: React.ReactNode
}

const layout : FC<Props> = ({children}) => {
  return (
    <DashboardLayout>
        {children}
    </DashboardLayout>
  )
}

export default layout