import React from 'react'
import EventSearch from '../widgets/EventSearch'
import CategoryScroll from '../widgets/Categories'
import EventCard from '../ui/EventCard'

const ExploreEvents = () => {
    return (
        <div className='py-20 px-[5%]'>
            <h2 className='py-20 text-center text-[42px]'>Explore Events</h2>

            <EventSearch />

            <CategoryScroll />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5 '>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 2].map((item, i) => {
                        return (
                            <EventCard key={i} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExploreEvents