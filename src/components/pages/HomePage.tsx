import Nav from '@/components/widgets/Nav'
import React from 'react'
import Banner from '@/components/widgets/homepage/Banner'
import TopEvents from '../widgets/homepage/TopEvents'
import EventInMyLocation from '../widgets/homepage/EventInMyLocation'
import CategoryScroll from '../widgets/Categories'
import EventSearch from '../widgets/EventSearch'
import FloatingBalls from '../widgets/FloatingBalls'
import Footer from '../widgets/Footer'
import PremiumEvents from '../widgets/homepage/PremiumEvents'
import InteractiveGamesSection  from '../widgets/homepage/EventGames'
import RentalsSection from '../widgets/homepage/Rentals'

const HomePage = () => {
  return (
    <div className='px-[5%] flex flex-col gap-20'>
      <FloatingBalls />
      <Banner />
      <CategoryScroll />
      <EventSearch />
      <PremiumEvents />
      <EventInMyLocation />
      {/* <TopEvents /> */}
      <RentalsSection />
      <InteractiveGamesSection />
    </div>
  )
}

export default HomePage