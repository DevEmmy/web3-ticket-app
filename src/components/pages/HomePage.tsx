import Nav from '@/components/widgets/Nav'
import React from 'react'
import Banner from '../widgets/homepage/Banner'
import TopEvents from '../widgets/homepage/TopEvents'
import EventInMyLocation from '../widgets/homepage/EventInMyLocation'
import CategoryScroll from '../widgets/Categories'

const HomePage = () => {
  return (
    <div className='px-[5%] flex flex-col gap-20'>
      <Nav />
      <Banner />
      <CategoryScroll />
      <TopEvents />
      <EventInMyLocation />

    </div>
  )
}

export default HomePage