import Nav from '@/components/widgets/Nav'
import React from 'react'
import Banner from '../widgets/homepage/Banner'
import TopEvents from '../widgets/homepage/TopEvents'
import EventInMyLocation from '../widgets/homepage/EventInMyLocation'
import CategoryScroll from '../widgets/Categories'
import EventSearch from '../widgets/EventSearch'
import FloatingBalls from '../widgets/FloatingBalls'
import Footer from '../widgets/Footer'

const HomePage = () => {
  return (
    <div className='px-[5%] flex flex-col gap-20'>
      <FloatingBalls />
      <Nav />
      <Banner />
      <CategoryScroll />
      <EventSearch />
      <TopEvents />
      <EventInMyLocation />
      <Footer />
    </div>
  )
}

export default HomePage