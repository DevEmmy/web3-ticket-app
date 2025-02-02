import Nav from '@/components/widgets/Nav'
import React from 'react'
import Banner from '../widgets/homepage/Banner'
import TopEvents from '../widgets/homepage/TopEvents'

const HomePage = () => {
  return (
    <div className='px-[5%] flex flex-col gap-20'>
      <Nav />
      <Banner />
      <TopEvents />
    </div>
  )
}

export default HomePage