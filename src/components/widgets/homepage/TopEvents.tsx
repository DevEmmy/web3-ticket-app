import EventCard from '@/components/ui/EventCard'
import React from 'react'

const TopEvents = () => {
    return (
        <div className='flex flex-col gap-3'>
            <h2 className='text-[40px] font-bold'>Top Events</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5'>
                {
                    [1, 2, 3, 4, 5].map((item, i) => {
                        return (
                            <EventCard key={i} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TopEvents