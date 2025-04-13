import React from 'react'
import EventSearch from '../widgets/EventSearch'
import CategoryScroll from '../widgets/Categories'
import EventCard from '../ui/EventCard'
import { events } from '../utils/constants'
const ExploreEvents = () => {
    return (
        <div className='py-20 px-[5%]'>
            <h2 className='py-5 text-center text-[42px]'>Explore Events</h2>

            <EventSearch />
            <CategoryScroll />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 '>
                {
                    events.map((item, i) => {
                        return (
                            <EventCard key={i} event={item} />
                        )
                    })}
            </div>
        </div>
    )
}

export default ExploreEvents